let Component = require('../models/Component');
let _ = require('underscore');

let components = [];
let initBudget = 0;
let otherParts = 0;
let mainComposBudget = 0;
let originalBudget = 0;

let resolvePromise, rejectPromise;

exports.generateBuild = async (req, res, next) => {
    originalBudget = req.body.budget;
    console.log('originalBudget: ', originalBudget);
    mainComposBudget = originalBudget - (originalBudget * .09);
    console.log('mainComposBudget: ', mainComposBudget);
    initBudget = (mainComposBudget <= 10000)? mainComposBudget: originalBudget - 10000;
    console.log('initBudget: ', initBudget);
    try {
        components = await Component.find();
        // console.info(`req: `, req.body);

        components.sort((a, b) => {
            return b.rating - a.rating;
        })

        let finalBuild = await createBuild();
        // console.log('finalBuild: ', finalBuild);
        return res.status(200).json({
            success: true,
            data: finalBuild
        })
    } catch (error) {
        // console.log('error: ', error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

sortComponents = (componentsToSort, highestFirst = false, sortBy) => {
    componentsToSort.sort((a, b) => {
        if (highestFirst) return b[sortBy] - a[sortBy];
        return a[sortBy] - b[sortBy]
    });
    return componentsToSort;
}

createBuild = () => {
    let buildPromise = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
    });
    filterComponents();
    return buildPromise;
}

// Add Error handling if no component found for the given budget
// Separte filtering of components per component type

selectCPU = (filter = {}, cpuBudget) => {
    console.log('selectCPU');
    let cpuError = null;
    let CPUS =  components.filter(component => component.type === 'CPU');
    if (!CPUS.length) {
        return {
            CPU: undefined,
            cpuError: {
                errorCode: 1,
                errorMessage: "No CPU found!",
            }
        }
    }

    CPUS =  CPUS.filter(component => component.price <= cpuBudget);
    if (!CPUS.length) {
        return {
            CPU: undefined,
            cpuError: {
                errorCode: 2,
                errorMessage: "Insufficient budget!",
            }
        }
    }

    // console.log('CPU filter: ', filter);

    if (!_.isEmpty(filter) && filter.chipset) {
        CPUS =  CPUS.filter(component => filter.chipset !== component.chipset);
        if (!CPUS.length) {
            return {
                CPU: undefined,
                cpuError: {
                    errorCode: 3,
                    errorMessage: "Compatibility Error!",
                }
            }
        }
    }
    let CPU = CPUS[0];
    return {CPU, cpuError};
}

selectGPU = (filter = {}, gpuBudget) => {
    console.log('selectGPU');
    let gpuError = null;
    let GPUS =  components.filter(component => component.type === 'GPU');
    if (!GPUS.length) {
        return {
            GPU: undefined, 
            gpuError: {
                errorCode: 1,
                errorMessage: "No GPU found!",
            }
        }
    };
    GPUS =  GPUS.filter(component => component.price <= gpuBudget);
    if (!GPUS.length) {
        return {
            GPU: undefined, 
            gpuError: {
                errorCode: 2,
                errorMessage: "Insufficient budget!",
            }
        }
    };
    let GPU = GPUS[0];
    return {GPU, gpuError};
}

selectRAM = (filter = {}, ramBudget) => {
    console.log('selectRAM');
    let ramError = null;
    let RAMS = components.filter(component => component.type === 'RAM');
    if (!RAMS.length) {
        return {
            RAM: undefined, 
            ramError: {
                errorCode: 1,
                errorMessage: "Insufficient budget!",
            }
        }
    };
    RAMS =  RAMS.filter(component => component.price <= ramBudget);
    if (!RAMS.length) {
        return {
            RAM: undefined, 
            ramError: {
                errorCode: 2,
                errorMessage: "No RAM found!",
            }
        }
    };
    let RAM = RAMS[0];
    return {RAM, ramError};
}

selectMOBO = (filter = {}, CPU, RAM, moboBudget, highestFirst = false) => {
    console.log('selectMOBO');
    let moboError = null;
    let sortedComponents;

    sortedComponents = sortComponents([...components], highestFirst, 'price');

    let MOBOS =  sortedComponents.filter(component => component.type === 'MOBO');
    if (!MOBOS.length) {
        return {
            MOBO: undefined, 
            moboError: {
                errorCode: 1,
                errorMessage: "No MOBO found!",
            }
        }
    };
    // console.log('Filter by type:', MOBOS.length);
    MOBOS = MOBOS.filter(component => component.price <= moboBudget);
    if (!MOBOS.length) {
        return {
            MOBO: undefined, 
            moboError: {
                errorCode: 2,
                errorMessage: "Insufficient budget!",
            }
        }
    };
    // console.log('Filter by price:', MOBOS.length);
    MOBOS = MOBOS.filter(component => component.ramSlots >= RAM.ramSlots);
    if (!MOBOS.length) {
        return {
            MOBO: undefined, 
            moboError: {
                errorCode: 3,
                errorMessage: "No compatible Motherboard found!",
            }
        }
    };
    // console.log('Filter by ramSlots:', MOBOS.length);
    MOBOS = MOBOS.filter(component => CPU.chipset.split(',').includes(component.chipset));
    if (!MOBOS.length) {
        return {
            MOBO: undefined, 
            moboError: {
                errorCode: 4,
                errorMessage: "No compatible Motherboard found!",
            }
        }
    };
    // console.log('Filter by chipset:', MOBOS.length);

    let MOBO = MOBOS[0];
    return {MOBO, moboError};
}

selectPSU = (filter = {}, psuBudget) => {
    console.log('selectPSU');
    let psuError = null;
    let PSUS = components.filter(component => component.type === 'PSU');
    if (!PSUS.length) {
        return {
            PSU: undefined, 
            psuError: {
                errorCode: 1,
                errorMessage: "Insufficient budget!",
            }
        }
    };
    const { GPU } = filter;
    PSUS =  PSUS.filter(component => component.watts >= GPU.watts);
    if (!PSUS.length) {
        return {
            PSU: undefined, 
            psuError: {
                errorCode: 2,
                errorMessage: "No PSU found!",
            }
        }
    };
    PSUS =  PSUS.filter(component => component.price <= psuBudget);
    if (!PSUS.length) {
        return {
            PSU: undefined, 
            psuError: {
                errorCode: 2,
                errorMessage: "No PSU found!",
            }
        }
    };
    let PSU = PSUS[0];

    return {PSU, psuError};
}

selectHSF = (filter = {}, hsfBudget) => {
    console.log('selectPSU');
    let hsfError = null;
    let HSFS = components.filter(component => component.type === 'HSF');
    if (!HSFS.length) {
        return {
            HSF: undefined, 
            hsfError: {
                errorCode: 1,
                errorMessage: "Insufficient budget!",
            }
        }
    };
    const { CPU } = filter;
    HSFS =  HSFS.filter(component => component.tdp >= CPU.tdp);
    if (!HSFS.length) {
        return {
            HSF: undefined, 
            hsfError: {
                errorCode: 2,
                errorMessage: "No HSF found!",
            }
        }
    };
    // HSFS =  HSFS.filter(component => component.socket.split(',').includes(CPU.socket));
    // if (!HSFS.length) {
    //     return {
    //         HSF: undefined, 
    //         hsfError: {
    //             errorCode: 2,
    //             errorMessage: "No HSF found!",
    //         }
    //     }
    // };
    HSFS =  HSFS.filter(component => component.price <= hsfBudget);
    if (!HSFS.length) {
        return {
            HSF: undefined, 
            hsfError: {
                errorCode: 2,
                errorMessage: "No HSF found!",
            }
        }
    };
    let HSF = HSFS[0];
    return {HSF, hsfError};
}

resolver = response => {
    resolvePromise(response);
}

filterComponents = (filter = {}) => {
    console.log(' --------------------------- filterComponents --------------------------- ');
    console.log(' --------------------------- filterComponents --------------------------- ');
    console.log(' --------------------------- filterComponents --------------------------- ');

    // MOBO NOT FOUND WHEN BUDGET IS AROUND 200000

    let { cpuFilter, gpuFilter, ramFilter, psuFilter, moboFilter, hsfFilter } = filter;

    let ramBudget = (initBudget * 0.10 <= 10000)? initBudget * 0.10: 15000;
    let moboBudget = (initBudget * 0.20 <= 20000)? initBudget * 0.20: 20000;
    
    let remainingBudget = initBudget - (ramBudget + moboBudget);
    let cpuBudget = remainingBudget * 0.35;
    let gpuBudget = remainingBudget * 0.65;

    let psuBudget;
    let hsfBudget;

    let {CPU, cpuError} = selectCPU(cpuFilter, cpuBudget);

    if (cpuError) {
        resolvePromise(cpuError);
        return;
    }

    // console.log('CPU: ', CPU);

    let {GPU, gpuError} = selectGPU(gpuFilter, gpuBudget);

    if (gpuError) {
        resolvePromise(gpuError);
        return;
    }

    // console.log('GPU: ', GPU);

    let {RAM, ramError} = selectRAM(ramFilter, ramBudget);

    if (ramError) {
        resolvePromise(ramError);
        return;
    }

    // console.log('RAM: ', RAM);

    let { MOBO, moboError } = selectMOBO(moboFilter, CPU, RAM, moboBudget);

    // console.log('MOBO: ', MOBO);

    if (moboError && moboError.errorCode === 4) {
        if (moboError.errorCode === 4) {
            filter = {
                cpuFilter: {
                    chipset: CPU.chipset,
                }
            }
            // setTimeout(() => {
                filterComponents(filter);
            // }, 2000);
            return;
        }
        else {
            resolvePromise(gpuError);
            return;
        }
    }
    
    let total = CPU.price + GPU.price + RAM.price + MOBO.price;
    let remaining = initBudget - total;

    let secondaryGPU = selectGPU(gpuFilter, GPU.price + remaining).GPU;
    let newMOBOBudget, newMOBO, newMOBOError;

    if (secondaryGPU) {
        total -= GPU.price;
        total += secondaryGPU.price;
        remaining = initBudget - total;
        newMOBOBudget = MOBO.price + remaining;
        ({ MOBO: newMOBO, moboError: newMOBOError } = selectMOBO(moboFilter, CPU, RAM, newMOBOBudget, true));
        if (newMOBO && !newMOBOError) {
            console.log('1. total: ', total);
            total -= MOBO.price;
            console.log('2. total: ', total);
            total += newMOBO.price;
            console.log('3. total: ', total);
            remaining = originalBudget - total;
        }
    }

    psuBudget = remaining * 0.5;
    hsfBudget = remaining * 0.5;

    psuFilter = {
        GPU: secondaryGPU || GPU
    };

    let {PSU, psuError} = selectPSU(psuFilter, psuBudget);

    if (psuError) {
        resolvePromise(psuError);
        return;
    }

    total += PSU.price;
    remaining = originalBudget - total;

    hsfFilter = { CPU };

    let {HSF, hsfError} = selectHSF(hsfFilter, hsfBudget);

    if (hsfError) {
        resolvePromise(hsfError);
        return;
    }
    total += HSF.price;
    remaining = originalBudget - total;

    let finalBuild = {
        budget: {
            cpuBudget,
            gpuBudget,
            ramBudget,
            moboBudget,
            psuBudget,
            hsfBudget,
        },
        CPU,
        GPU: secondaryGPU || GPU,
        RAM,
        MOBO: newMOBO || MOBO,
        PSU,
        HSF,
        total,
        remaining,
    };
    
    resolvePromise(finalBuild);
}