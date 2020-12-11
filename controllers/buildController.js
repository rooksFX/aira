let Component = require('../models/Component');
let _ = require('underscore');

let components = [];
let componentsSortedByPrice = [];
let initBudget = 0;

let resolvePromise, rejectPromise;

exports.generateBuild = async (req, res, next) => {
    initBudget = req.body.budget;
    try {
        components = await Component.find();
        // testFunction(components);
        debugger;
        console.info(`req: `, req.body);

        components.sort((a, b) => {
            return b.rating - a.rating;
        })

        componentsSortedByPrice = [...components];

        componentsSortedByPrice.sort((a, b) => {
            return a.price - b.price;
        })

        let finalBuild = await createBuild();
        console.log('finalBuild: ', finalBuild);
        return res.status(200).json({
            success: true,
            data: finalBuild
        })
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
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

    console.log('CPU filter: ', filter);

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
    console.log(' --------------------------- selectRAM --------------------------- ');
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
    console.log('RAMS: ', RAMS);
    let RAM = RAMS[0];
    return {RAM, ramError};
}

selectMOBO = (filter = {}, CPU, RAM, moboBudget) => {
    console.log('selectMOBO');
    let moboError = null;
    let MOBOS =  componentsSortedByPrice.filter(component => component.type === 'MOBO');
    if (!MOBOS.length) {
        return {
            MOBO: undefined, 
            moboError: {
                errorCode: 1,
                errorMessage: "No MOBO found!",
            }
        }
    };
    console.log('Filter by type:', MOBOS.length);
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
    console.log('Filter by price:', MOBOS.length);
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
    console.log('Filter by ramSlots:', MOBOS.length);
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
    console.log('Filter by chipset:', MOBOS.length);

    let MOBO = MOBOS[0];
    return {MOBO, moboError};
}

resolver = response => {
    resolvePromise(response);
}

filterComponents = (filter = {}) => {
    console.log(' --------------------------- filterComponents --------------------------- ');
    console.log(' --------------------------- filterComponents --------------------------- ');
    console.log(' --------------------------- filterComponents --------------------------- ');

    // MOBO NOT FOUND WHEN BUDGET IS AROUND 200000

    let { cpuFilter, gpuFilter, ramFilter, moboFilter } = filter;

    let ramBudget = (initBudget * 0.10 <= 10000)? initBudget * 0.10: 15000;
    let moboBudget = (initBudget * 0.20 <= 20000)? initBudget * 0.20: 20000;
    
    let budget = initBudget - (ramBudget + moboBudget);
    let cpuBudget = budget * 0.35;
    let gpuBudget = budget * 0.65;

    let {CPU, cpuError} = selectCPU(cpuFilter, cpuBudget);

    if (cpuError) {
        resolvePromise(cpuError);
        return
    }

    console.log('CPU: ', CPU);

    let {GPU, gpuError} = selectGPU(gpuFilter, gpuBudget);

    if (gpuError) {
        resolvePromise(gpuError);
        return
    }

    // console.log('GPU: ', GPU);

    let {RAM, ramError} = selectRAM(ramFilter, ramBudget);

    if (ramError) {
        resolvePromise(ramError);
        return
    }

    console.log(' --------------------------- selectRAM --------------------------- ');
    console.log('RAM: ', RAM);

    let {MOBO, moboError} = selectMOBO(moboFilter, CPU, RAM, moboBudget);

    console.log('MOBO: ', MOBO);

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
            return
        }
    }
    
    let total = CPU.price + GPU.price + RAM.price + MOBO.price;
    let remaining = initBudget - total;

    let secondaryGPU = selectGPU(gpuFilter, GPU.price + remaining).GPU;

    if (secondaryGPU) {
        total -= GPU.price;
        total += secondaryGPU.price;
    }

    remaining = initBudget - total;

    let finalBuild = {
        budget: {
            cpuBudget, gpuBudget, ramBudget, moboBudget
        },
        CPU,
        GPU: secondaryGPU || GPU,
        RAM,
        MOBO,
        total,
        remaining,
    };
    
    resolvePromise(finalBuild);
}