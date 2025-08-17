const translations = {
    app: {
        language: {
            title: {
                en: "App Language",
                es: "Idioma de la aplicación",
                hi: "ऐप भाषा"
            },
            subtitle: {
                en: "Choose your preferred language for viewing content",
                es: "Elige tu idioma preferido para ver el contenido",
                hi: "सामग्री देखने के लिए अपनी पसंदीदा भाषा चुनें"
            }
        }
    },
    introHeader: {
        en: (username) => `Welcome back, <i>@${username}</i>. Ready to work?`,
        es: (username) => `Bienvenido de nuevo, <i>@${username}</i>. ¿Listo para trabajar?`,
        hi: (username) => `वापस स्वागत है, <i>@${username}</i>। काम करने के लिए तैयार हैं?`
    },
    hello: {
        en: "Hello 👋",
        es: "Hola 👋",
        hi: "नमस्ते 👋"
    },
    verification: {
        en: "Verification",
        es: "Verificación",
        hi: "सत्यापन"
    },
    admin: {
        title: {
            en: "Admin Dashboard",
            es: "Panel de administración",
            hi: "प्रशासक डैशबोर्ड"
        },
        description: {
            en: "Central hub to manage all users, and files.",
            es: "Centro central para administrar todos los usuarios y archivos.",
            hi: "सभी उपयोगकर्ताओं और फाइलों को प्रबंधित करने के लिए केंद्रीय हब।"
        }
    },
    insights: {
        title: {
            en: "User Insights",
            es: "Información del usuario",
            hi: "उपयोगकर्ता अंतर्दृष्टि"
        },
        description: {
            en: "Track key user statistics including total signups, verification status, and login method distribution.",
            es: "Realice un seguimiento de las estadísticas clave de los usuarios, incluidos los registros totales, el estado de verificación y la distribución del método de inicio de sesión.",
            hi: "कुल साइनअप, सत्यापन स्थिति और लॉगिन विधि वितरण सहित मुख्य उपयोगकर्ता आंकड़ों को ट्रैक करें।"
        },
        header: {
            left: {
                en: "User Stats",
                es: "Estadísticas de usuario",
                hi: "उपयोगकर्ता आंकड़े"
            },
            right: {
                en: "Login Method Distribution",
                es: "Distribución del método de inicio de sesión",
                hi: "लॉगिन विधि वितरण"
            }
        },
        footer: {
            left: {
                title: {
                    en: "A breakdown of all user status.",
                    es: "Un desglose de todos los estados de los usuarios.",
                    hi: "सभी उपयोगकर्ता स्थिति का विवरण।"
                }
            },
            right: {
                title: {
                    en: "User Login Breakdown",
                    es: "Desglose del inicio de sesión del usuario",
                    hi: "उपयोगकर्ता लॉगिन विवरण"
                },
                subtitle: {
                    en: "Based on all-time user authentication data",
                    es: "Basado en datos de autenticación de usuarios de todos los tiempos",
                    hi: "सभी समय के उपयोगकर्ता प्रमाणीकरण डेटा के आधार पर"
                }
            }
        },
        stats: {
            verified: {
                en: "Verified Users",
                es: "Usuarios verificados",
                hi: "सत्यापित उपयोगकर्ता"
            },
            unverified: {
                en: "Unverified Users",
                es: "Usuarios no verificados",
                hi: "असत्यापित उपयोगकर्ता"
            },
            email: {
                en: "Email Login",
                es: "Inicio de sesión con correo electrónico",
                hi: "ईमेल लॉगिन"
            },
            google: {
                en: "Google Login",
                es: "Inicio de sesión con Google",
                hi: "गूगल लॉगिन"
            },
            github: {
                en: "Github Login",
                es: "Inicio de sesión con Github",
                hi: "गिटहब लॉगिन"
            }
        }
    },
    users: {
        title: {
            en: "Users",
            es: "Usuarias",
            hi: "उपयोगकर्ता"
        },
        description: {
            en: "View user details, manage accounts, or remove users.",
            es: "Ver detalles del usuario, administrar cuentas o eliminar usuarios.",
            hi: "उपयोगकर्ता विवरण देखें, खाते प्रबंधित करें, या उपयोगकर्ताओं को हटाएं।"
        },
        header: {
            left: {
                en: "Users",
                es: "Usuarias",
                hi: "उपयोगकर्ता"
            },
            right: {
                en: "User Info",
                es: "Información del usuario",
                hi: "उपयोगकर्ता जानकारी"
            }
        },
        text: {
            username: {
                en: "Username",
                es: "Nombre de usuario",
                hi: "उपयोगकर्ता नाम"
            },
            email: {
                en: "Email",
                es: "Correo electrónico",
                hi: "ईमेल"
            },
            verified: {
                en: "Verified",
                es: "Verificado",
                hi: "सत्यापित"
            },
            method: {
                en: "Login Method",
                es: "Método de inicio de sesión",
                hi: "लॉगिन विधि"
            },
            role: {
                en: "Role",
                es: "Rol",
                hi: "भूमिका"
            }
        }
    },
    upload: {
        title: {
            en: "Upload",
            es: "Subir",
            hi: "अपलोड"
        },
        description: {
            en: "Upload xlsx file and create charts.",
            es: "Sube un archivo xlsx y crea gráficos.",
            hi: "xlsx फाइल अपलोड करें और चार्ट बनाएं।"
        },
        text: {
            preview: {
                en: "Chart Preview",
                es: "Vista previa del gráfico",
                hi: "चार्ट पूर्वावलोकन"
            },
            close: {
                en: "Close",
                es: "Cerca",
                hi: "बंद करें"
            },
            warning: {
                en: "Please enter a Chart name",
                es: "Por favor, introduzca un nombre para el gráfico",
                hi: "कृपया चार्ट का नाम दर्ज करें"
            },
            back: {
                en: "Go Back",
                es: "Volver",
                hi: "वापस जाएं"
            },
            id: {
                en: "ID",
                es: "IDENTIFICACIÓN",
                hi: "आईडी"
            }
        }
    },
    files: {
        title: {
            en: "Files",
            es: "Archivos",
            hi: "फाइलें"
        },
        description: {
            en: "Track all the files uploaded, view or delete them",
            es: "Realizar un seguimiento de todos los archivos cargados, visualizarlos o eliminarlos",
            hi: "अपलोड की गई सभी फाइलों को ट्रैक करें, उन्हें देखें या हटाएं"
        },
        header: {
            left: {
                en: "Files",
                es: "Archivos",
                hi: "फाइलें"
            },
            right: {
                en: "File Info",
                es: "Información del archivo",
                hi: "फाइल जानकारी"
            }
        },
        top: {
            total: {
                en: "Total Files",
                es: "Archivos totales",
                hi: "कुल फाइलें"
            },
            public: {
                en: "Public Files",
                es: "Archivos públicos",
                hi: "सार्वजनिक फाइलें"
            },
            private: {
                en: "Private Files",
                es: "Archivos privados",
                hi: "निजी फाइलें"
            },
            storage: {
                en: "Used Storage",
                es: "Almacenamiento utilizado",
                hi: "उपयोग किया गया भंडारण"
            },
        },
        text: {
            view: {
                en: "View Spreadsheet",
                es: "Ver hoja de cálculo",
                hi: "स्प्रेडशीट देखें"
            },
            create: {
                en: "Create charts",
                es: "Crear gráficos",
                hi: "चार्ट बनाएं"
            },
            copy: {
                en: "Copy Link",
                es: "Copiar enlace",
                hi: "लिंक कॉपी करें"
            },
            rows: {
                en: "Rows",
                es: "Filas",
                hi: "पंक्तियां"
            },
            columns: {
                en: "Columns",
                es: "Columnas",
                hi: "स्तंभ"
            },
            size: {
                en: "File Size",
                es: "Tamaño del archivo",
                hi: "फाइल का आकार"
            },
            confirm: {
                en: "Confirm",
                es: "Confirmar",
                hi: "पुष्टि करें"
            }
        },
        delete: {
            title: {
                en: "Are you absolutely sure?",
                es: "¿Estás completamente seguro?",
                hi: "क्या आप बिल्कुल निश्चित हैं?"
            },
            description: {
                en: "This action is irreversible. Deleting this file will permanently remove it. However, the chart associated with this file will remain unaffected.",
                es: "Esta acción es irreversible. Eliminar este archivo lo eliminará permanentemente. Sin embargo, el gráfico asociado a él no se verá afectado.",
                hi: "यह कार्य अपरिवर्तनीय है। इस फाइल को हटाने से यह स्थायी रूप से हट जाएगी। हालांकि, इस फाइल से संबंधित चार्ट अप्रभावित रहेगा।"
            }
        }
    },
    charts: {
        title: {
            en: "Charts",
            es: "Gráficos",
            hi: "चार्ट"
        },
        description: {
            en: "View saved charts, download in PNG or PDF format",
            es: "Ver gráficos guardados, descargar en formato PNG o PDF",
            hi: "सहेजे गए चार्ट देखें, PNG या PDF फॉर्मेट में डाउनलोड करें"
        },
        header: {
            left: {
                en: "Charts",
                es: "Gráficos",
                hi: "चार्ट"
            },
            right: {
                en: "Chart Info",
                es: "Información del gráfico",
                hi: "चार्ट जानकारी"
            }
        },
        text: {
            view: {
                en: "View Chart",
                es: "Ver gráfico",
                hi: "चार्ट देखें"
            },
            delete: {
                en: "Delete Chart",
                es: "Eliminar gráfico",
                hi: "चार्ट हटाएं"
            },
            created: {
                en: "Created at",
                es: "Creado en",
                hi: "बनाया गया"
            },
            x: {
                en: "X Axis",
                es: "Eje X",
                hi: "X अक्ष"
            },
            y: {
                en: "Y Axis",
                es: "Eje Y",
                hi: "Y अक्ष"
            },
            name: {
                en: "Filename",
                es: "Nombre del archivo",
                hi: "फाइल नाम"
            },
            type: {
                en: "Type",
                es: "Tipo",
                hi: "प्रकार"
            },
            download: {
                en: "Download Image",
                es: "Descargar imagen",
                hi: "इमेज डाउनलोड करें"
            },
            confirm: {
                en: "Confirm",
                es: "Confirmar",
                hi: "पुष्टि करें"
            }
        },
        delete: {
            title: {
                en: "Are you absolutely sure?",
                es: "¿Estás completamente seguro?",
                hi: "क्या आप बिल्कुल निश्चित हैं?"
            },
            description: {
                en: "This action is irreversible. Deleting this chart will permanently remove it. However, the file associated with this chart will remain unaffected.",
                es: "Esta acción es irreversible. Eliminar este gráfico lo eliminará permanentemente. Sin embargo, el archivo asociado a él no se verá afectado.",
                hi: "यह कार्य अपरिवर्तनीय है। इस चार्ट को हटाने से यह स्थायी रूप से हट जाएगा। हालांकि, इस चार्ट से संबंधित फाइल अप्रभावित रहेगी।"
            }
        }
    },
    uploadMeta: {
        title: {
            en: "Upload Excel File",
            es: "Subir archivo de Excel",
            hi: "एक्सेल फाइल अपलोड करें"
        },
        description: {
            en: "Select an Excel file and configure your chart",
            es: "Seleccione un archivo de Excel y configure su gráfico",
            hi: "एक एक्सेल फाइल चुनें और अपना चार्ट कॉन्फ़िगर करें"
        }
    },
    selectMeta: {
        title: {
            en: "Select X and Y axis",
            es: "Seleccionar los ejes X e Y",
            hi: "X और Y अक्ष चुनें"
        },
        x: {
            en: "Select X axis",
            es: "Seleccionar el eje X",
            hi: "X अक्ष चुनें"
        },
        y: {
            en: "Select Y axis",
            es: "Seleccionar el eje Y",
            hi: "Y अक्ष चुनें"
        }
    },
    rows: {
        en: "Rows",
        es: "Filas",
        hi: "पंक्तियां"
    },
    columns: {
        en: "Columns",
        es: "Columnas",
        hi: "स्तंभ"
    },
    chartType: {
        en: "Chart Type",
        es: "Tipo de gráfico",
        hi: "चार्ट प्रकार"
    },
    chartSubType: {
        en: "Chart SubType",
        es: "Subtipo de gráfico",
        hi: "चार्ट उप-प्रकार"
    },
    chartSelect: {
        area: {
            title: {
                en: "Area",
                es: "Área",
                hi: "क्षेत्र"
            },
            description: {
                en: "Displays cumulative totals with the area filled.",
                es: "Muestra totales acumulativos con el área rellena.",
                hi: "भरे हुए क्षेत्र के साथ संचयी योग प्रदर्शित करता है।"
            },
        },
        bar: {
            title: {
                en: "Bar",
                es: "Barra",
                hi: "बार"
            },
            description: {
                en: "Compares quantities across categories.",
                es: "Compara cantidades entre categorías.",
                hi: "श्रेणियों में मात्राओं की तुलना करता है।"
            }
        },
        line: {
            title: {
                en: "Line",
                es: "Línea",
                hi: "रेखा"
            },
            description: {
                en: "Shows trends over time.",
                es: "Muestra tendencias a lo largo del tiempo.",
                hi: "समय के साथ रुझान दिखाता है।"
            }
        },
        radar: {
            title: {
                en: "Radar",
                es: "Radar",
                hi: "रडार"
            },
            description: {
                en: "Shows strengths/weaknesses of multiple variables.",
                es: "Muestra fortalezas/debilidades de múltiples variables.",
                hi: "कई चर की शक्तियों/कमजोरियों को दिखाता है।"
            }
        }
    },
    text: {
        total: {
            en: "Total",
            es: "Total",
            hi: "कुल"
        },
        current: {
            en: "Current",
            es: "Actual",
            hi: "वर्तमान"
        },
        logout: {
            en: "Log out",
            es: "Finalizar la sesión",
            hi: "लॉग आउट"
        },
        joined: {
            en: "Joined",
            es: "Unida",
            hi: "शामिल हुए"
        },
        timeAgo: {
            just: {
                en: "just now",
                es: "En este momento",
                hi: "अभी अभी"
            },
            minutes: {
                en: "minutes(s) now",
                es: "minutos ahora",
                hi: "मिनट पहले"
            },
            hours: {
                en: "hour(s) now",
                es: "hora(s) ahora",
                hi: "घंटे पहले"
            },
            day: {
                en: "day ago",
                es: "hace un día",
                hi: "दिन पहले"
            },
            days: {
                en: "day(s) ago",
                es: "hace día(s)",
                hi: "दिन पहले"
            },
            months: {
                en: "month(s) ago",
                es: "Hace meses",
                hi: "महीने पहले"
            },
            years: {
                en: "year(s) ago",
                es: "hace años que",
                hi: "साल पहले"
            }
        }
    }
};

export default translations;