import { Product, Testimonial, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "bases",
    name: "Bases & Rostro",
    icon: "Sparkles",
    img: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "labiales",
    name: "Labiales de Lujo",
    icon: "Heart",
    img: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sombras",
    name: "Sombras & Ojos",
    icon: "Eye",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "rubores",
    name: "Rubores & Bronceadores",
    icon: "Compass",
    img: "https://images.unsplash.com/photo-1631730359575-38e4755d772b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "iluminadores",
    name: "Iluminadores Radiantes",
    icon: "Sun",
    img: "https://images.unsplash.com/photo-1522338223662-4217316715b9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "kits",
    name: "Kits Profesionales",
    icon: "Briefcase",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Velvet Luxe Foundation",
    price: 45.00,
    rating: 5,
    category: "bases",
    description: "Base fluida ultra-ligera de cobertura total con un acabado aterciopelado radiante.",
    longDescription: "Nuestra base icónica Velvet Luxe Foundation ofrece una fusión impecable entre cuidado de la piel y maquillaje de alta costura. Formulada con ácido hialurónico y extractos de rosa de Damasco, mantiene la hidratación durante 24 horas protegiendo la barrera de la piel, con un acabado impecable mate satinado que no se transfiere.",
    benefits: [
      "24 horas de cobertura impecable sin cuartearse",
      "Fórmula hidratante con ácido hialurónico activo",
      "Acabado aterciopelado natural de segunda piel",
      "Apta para todo tipo de pieles, incluyendo pieles sensibles"
    ],
    img: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop",
    shades: ["Porcelain 10N", "Sand 20W", "Honey 30O", "Amber 40N", "Bronze 50W"],
    isBestSeller: true
  },
  {
    id: "2",
    name: "Diamond Glow Highlighter",
    price: 38.00,
    rating: 5,
    category: "iluminadores",
    description: "Polvo sedoso ultra-fino impregnado de micro-perlas que ofrece un reflejo diamante tridimensional.",
    longDescription: "Un rocío de luz pura en tu piel. Diamond Glow Highlighter se funde como un líquido sobre los pómulos para crear un aspecto mojado deslumbrante. Sus perlas reflectantes se adaptan al tono de piel para capturar la luz solar desde cualquier ángulo.",
    benefits: [
      "Efecto mojado de alto brillo tridimensional",
      "Textura cremosa en polvo que no marca textura",
      "Brillo modulable desde sutil hasta multidimensional",
      "Espejo de cortesía de alta definición incorporado"
    ],
    img: "https://images.unsplash.com/photo-1522338223662-4217316715b9?q=80&w=600&auto=format&fit=crop",
    shades: ["Rose Quartz", "Champagne Gold", "Cosmic Pearl"],
    isBestSeller: true,
    isNew: true
  },
  {
    id: "3",
    name: "Royal Matte Lipstick",
    price: 25.00,
    rating: 4,
    category: "labiales",
    description: "Labial líquido mate de larga duración que brinda una pigmentación saturada y de máxima elegancia.",
    longDescription: "Viste tus labios con la opulencia de la realeza. El Royal Matte Lipstick aporta un velo de color de cobertura total con un confort absoluto durante todo el día. Enriquecido con aceite de jojoba y manteca de karité para evitar la resequedad típica de los labiales mate.",
    benefits: [
      "Impacto de color con una sola pasada de precisión",
      "Hasta 12 horas de duración aterciopelada y cómoda",
      "Fórmula nutritiva anti-sequedad con manteca de karité",
      "Aplicador anatómico ultra-preciso"
    ],
    img: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=600&auto=format&fit=crop",
    shades: ["Red Royalty", "Nude Majesty", "Mauve Queen", "Empress Pink", "Imperial Coral"],
    isBestSeller: true
  },
  {
    id: "4",
    name: "Golden Eyeshadow Palette",
    price: 55.00,
    rating: 5,
    category: "sombras",
    description: "Paleta majestuosa de 12 sombras altamente pigmentadas en tonos mate, satinados y metálicos suntuosos.",
    longDescription: "La máxima expresión artística para tu mirada. Esta combinación de doce exclusivos tonos de transición, marrones de alta costura, dorados bruñidos y bronces metálicos te permite crear desde looks naturales de día hasta maquillajes 'smokey' de noche sumamente sofisticados.",
    benefits: [
      "Pigmentación extrema y difuminado ultra-fluido",
      "Mínima caída de polvo gracias a su presión en frío",
      "Acabados variados: Mate, Satinado, Glitter prensado",
      "Fórmula enriquecida con vitamina E protectora"
    ],
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
    isNew: true
  },
  {
    id: "5",
    name: "Silk Finish Powder",
    price: 30.00,
    rating: 4,
    category: "bases",
    description: "Polvos traslúcidos micro-molidos que difuminan los poros y garantizan un acabado de seda de larga duración.",
    longDescription: "Establece tu obra de arte. Silk Finish Powder es un polvo translúcido que matifica la piel sin apagar la luminosidad. Refleja suavemente la luz para suavizar las líneas de expresión y retener el exceso de grasa con una ligereza imperceptible.",
    benefits: [
      "Efecto filtro de aire que difumina imperfecciones",
      "Fórmula translúcida compatible con todos los tonos",
      "Control de brillo absoluto sin acumular peso",
      "Ideal para fijar el corrector mediante técnicas de 'baking'"
    ],
    img: "https://images.unsplash.com/photo-1503236123135-083567c91674?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Luxury Makeup Kit",
    price: 120.00,
    rating: 5,
    category: "kits",
    description: "El cofre definitivo de la sofisticación. Incluye 5 best-sellers en tamaño de viaje y un estuche exclusivo.",
    longDescription: "Regala o regálate el lujo definitivo. Un cofre suntuoso que contiene nuestra mini base, un lápiz labial Royal Matte icónico, una brocha profesional kabuki de cerdas sintéticas de cachemira, y un mini spray fijador de larga duración de rocío de oro.",
    benefits: [
      "Ahorro exclusivo del 35% comparado con compra individual",
      "Elegante estuche de cuero ecológico labrado en oro",
      "Productos de alta performance ideales para viajes",
      "Empaque de regalo premium de edición súper limitada"
    ],
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Satin Blush Duo",
    price: 34.00,
    rating: 4,
    category: "rubores",
    description: "Dúo de rubor para esculpir e iluminar con un rubor satinado y un iluminador de calidez radiante.",
    longDescription: "Crea instantáneamente un resplandor saludable de aspecto juvenil. Este dúo presenta un polvo ultra-fino mate sutil y uno satinado brillante para crear una dimensión natural y un rubor rosado de apariencia juvenil.",
    benefits: [
      "Dos tonos complementarios para moldear y dar rubor",
      "Textura de cachemira ultra-fusionable",
      "Brillo sofisticado sin partículas gruesas de brillo",
      "Larga duración intacta durante 12 horas de confort"
    ],
    img: "https://images.unsplash.com/photo-1631730359575-38e4755d772b?q=80&w=600&auto=format&fit=crop",
    shades: ["Peach Sensation", "Soft Rose", "Bronze Radiance"]
  },
  {
    id: "8",
    name: "Radiant Shield Concealer",
    price: 29.00,
    rating: 5,
    category: "bases",
    description: "Corrector de alta cobertura que ilumina la mirada hidratando a profundidad.",
    longDescription: "El borrador de fatiga de alta costura. Radiant Shield Concealer ofrece una cobertura edificable de media a total que no se asienta en las líneas de expresión de los ojos. Formulado con extracto de cafeína para desinflamar e iluminar la ojera de manera progresiva.",
    benefits: [
      "Corrige, esculpe e ilumina con cobertura modulable",
      "Fórmula que no reseca la delicada zona de la ojera",
      "Acción energizante continua gracias a la cafeína infundida",
      "Acabado radiante natural resistente a pliegues"
    ],
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    shades: ["Light Sand 10", "Vanilla Cream 15", "Warm Custard 20", "Golden Honey 25", "Deep Amber 30"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    rating: 5,
    comment: "La Velvet Luxe Foundation es sencillamente espectacular. Cubre imperfecciones pero se siente súper ligera, y el aroma a rosas de Damasco es exquisito. Mi piel luce radiante y descansada.",
    date: "Hace 2 días",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Sofía Valenzuela",
    rating: 5,
    comment: "El Diamond Glow Highlighter ofrece un brillo mojado verdaderamente lujoso. No tiene purpurina gruesa, sino un brillo de perlas tan micro-molido que parece luz natural brotando de la piel.",
    date: "Hace 1 semana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Isabella Mendoza",
    rating: 5,
    comment: "Compré el Luxury Makeup Kit y estoy fascinada. El servicio al cliente fue de un nivel extraordinario y el empaque, labrado en dorado con flores, es una obra de arte. ¡Totalmente recomendado!",
    date: "Hace 2 semanas",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Camila Ortiz",
    rating: 5,
    comment: "Los labiales mate Royal duran todo el almuerzo y no resecan mis labios en lo absoluto. El tono 'Red Royalty' es el rojo perfecto que tanto estuve buscando por años.",
    date: "Hace 3 semanas",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop"
  }
];

export const BENEFITS = [
  {
    id: "premium",
    title: "Calidad Premium",
    desc: "Ingredientes certificados de lujo seleccionados éticamente e infundidos con activos botánicos.",
    icon: "Award"
  },
  {
    id: "envios",
    title: "Envíos Exclusivos",
    desc: "Cobertura nacional e internacional rápida con embalaje térmico especial para proteger tus cosméticos.",
    icon: "Truck"
  },
  {
    id: "originales",
    title: "Productos 100% Originales",
    desc: "Fórmulas de autor patentadas de alta tecnología fabricadas exclusivamente para J & M Glows.",
    icon: "ShieldCheck"
  },
  {
    id: "atencion",
    title: "Asesoría VIP 24/7",
    desc: "Nuestros maquilladores profesionales están disponibles para recomendarte el tono de base ideal.",
    icon: "Sparkles"
  },
  {
    id: "seguro",
    title: "Pago de Alta Alta Seguridad",
    desc: "Transacciones encriptadas de extremo a extremo, resguardando al 100% tus datos bancarios.",
    icon: "Lock"
  }
];
