export const DEMO_SETUP_VERSION = 1;
export const DEFAULT_DEMO_SETUP_DRAFT = {
    version: DEMO_SETUP_VERSION,
    updatedAt: '',
    completedStep: 0,
    profile: {
        schoolName: '',
        preset: 'secondary',
        country: 'Côte d’Ivoire',
        city: '',
        studentBand: '101-300',
        campusCount: 1
    },
    priorities: {
        mainPriority: 'organize',
        modules: ['students', 'pedagogy', 'finance']
    },
    rules: {
        periodScheme: 'trimester',
        gradingScale: '20',
        rankingEnabled: true,
        classesPerLevel: 1,
        classCapacity: 40,
        currency: 'XOF',
        paymentModes: ['cash', 'mobile-money']
    }
};
//# sourceMappingURL=demo-setup.models.js.map