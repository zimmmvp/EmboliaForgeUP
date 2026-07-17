const MAPEO_IMAGENES = {
    "1": "", // Espada Chota
    "2": "", // Armadura Pesada de Ciruja
    "3": "", // Guantes de Ciruja
    "4": "", // Botas de Ciruja
    "5": "", // Casco de Ciruja
    "6": "", // Túnica Ciruja
    "7": "", // Anillo de Ciruja
    "8": "", // Collar de Ciruja
    "9": "", // Armadura Ligera de Ciruja
    "10": "", // Palo Croto
    "11": "", // Escudo Croto
    "12": "", // Cazador de Plantas
    "13": "", // Bastón Croto
    "14": "", // Espada Metálica
    "15": "", // Maso Metálica
    "16": "", // Báculo Metálica
    "17": "", // Armadura gigante
    "18": "", // Guantes gigantes
    "19": "‎bootsHeavy2-sharedassets1.assets-221.png", // Botas Gigantes
    "20": "", // Casco Gigante
    "21": "", // Armadura de la suerte
    "22": "", // Guantes de la suerte
    "23": "bootsLight2-sharedassets1.assets-558.png", // Botas de la suerte
    "24": "", // Casco de la suerte
    "25": "", // Túnica de sombras
    "26": "", // Guantes de Sombra
    "27": "", // Botas de sombra
    "28": "", // Casco de sombra
    "29": "", // Anillo de Plata
    "30": "", // Collar de plata
    "31": "", // Escudo de Plata
    "32": "", // Cazador de Serpientes Grandes
    "33": "", // Daga Torcida
    "34": "", // Daga Metálica
    "35": "", // Cazador de Hongos
    "36": "", // Cazador de Serpientes Grandes
    "37": "", // Cazador de Gugas
    "38": "", // Armadura Imperial
    "39": "", // Guantes Imperiales
    "40": "bootsHeavy3-sharedassets1.assets-188.png", // Botas Imperiales
    "41": "", // Casco Imperial
    "42": "", // Armadura Elegante
    "43": "", // Guantes elegantes
    "44": "bootsLight2-sharedassets1.assets-558.png", // Botas Elegantes
    "45": "", // Casco Elegante
    "46": "", // Armadura de mago
    "47": "", // Guantes de mago
    "48": "", // Botas de mago
    "49": "", // Casco de mago
    "50": "", // Anillo Imperial
    "51": "", // Collar Imperial
    "52": "", // Espada Imperial
    "53": "", // Maza Imperial
    "54": "", // Báculo Imperial
    "55": "", // Daga Imperial
    "56": "", // Escudo Imperial
    "57": "", // Cazador de Golems
    "58": "", // Cazador de arañas
    "59": "", // Rey Jefe Basado
    "60": "", // Anillo del Rey Basado
    "61": "", // Pico de madera
    "62": "", // Pico de acero
    "63": "", // Pico Imperial
    "64": "", // Piedra de Ascenso
    "65": "", // Piedra de Catalizador
    "66": "", // Piedra de Negación de Ataque
    "67": "", // Piedra de Negación Mágica
    "68": "", // Piedra Barata
    "69": "", // Piedra AoE de lujo
    "70": "", // Piedra Escudo de Lujo
    "71": "", // Piedra de Vida de Lujo
    "72": "", // Cazador Esqueletoide
    "73": "", // Cazador de Inchabolus
    "74": "", // Jefa Moira Kazzan
    "75": "", // Anillo de Moira Kazzan
    "76": "", // La pesada armadura de Majul.
    "77": "", // Los guantes pesados de Majul.
    "78": "bootsHeavy4-sharedassets1.assets-584.png‎", // Las pesadas botas de Majul.
    "79": "", // El pesado casco de Majul.
    "80": "", // La armadura ligera de Majul.
    "81": "", // Los guantes ligeros de Majul.
    "82": "bootsLight4-sharedassets1.assets-230.png‎", // Las botas ligeras de Majul.
    "83": "", // El casco ligero de Majul.
    "84": "", // La túnica de Majul.
    "85": "", // Los guantes de la túnica de Majul.
    "86": "", // Botas de la túnica de Majul
    "87": "", // El casco de la túnica de Majul.
    "88": "", // Cazador de sirvientes Majul
    "89": "", // Cazador de guardabosques Majul
    "90": "", // Anillo Majul
    "91": "", // Jefe Majul
    "94": "", // Jefe Maestruli
    "95": "", // La Corona de Maestruli
    "96": "", // Armadura pesada de Doom
    "97": "", // Guantes pesados de Doom
    "98": "bootsHeavy5-sharedassets1.assets-627.png‎", // Botas pesadas de Doom
    "99": "", // Casco pesado de Doom
    "100": "", // Armadura ligera de Doom
    "101": "", // Guantes de luz de la perdición.
    "102": "bootsLight4-sharedassets1.assets-230.png‎", // Botas ligeras de Doom
    "103": "", // Casco ligero de Doom
    "104": "", // Armadura de túnica de la perdición
    "105": "", // Guantes de túnica de la perdición
    "106": "", // Botas de túnica de la perdición
    "107": "", // Túnica de la fatalidad casco
    "108": "", // Armadura pesada de hielo
    "109": "", // Guantes pesados de hielo.
    "110": "bootsHeavy6-sharedassets1.assets-197.png‎", // Botas pesadas de hielo.
    "111": "", // Casco pesado de hielo
    "112": "", // Armadura ligera de relámpago
    "113": "", // Guantes de luz relámpago
    "114": "", // Botas ligeras de rayo
    "115": "", // Casco de luz relámpago
    "116": "", // Armadura de túnica Infernus
    "117": "", // Guantes de la túnica Infernus
    "118": "", // Botas de la túnica del Infierno
    "119": "", // Casco de túnica Infernus
    "120": "", // Armadura pesada mutante
    "121": "", // Guantes pesados mutantes
    "122": "bootsHeavy7-sharedassets1.assets-284.png‎", // Botas pesadas mutantes
    "123": "", // Casco pesado mutante
    "124": "", // Armadura ligera mutante
    "125": "", // Guantes de luz mutantes
    "126": "", // Botas de luz mutantes
    "127": "", // Casco de luz mutante
    "128": "", // Armadura de túnica mutante
    "129": "", // Guantes de túnica mutante
    "130": "", // Botas de túnica mutante
    "131": "", // Casco de túnica mutante
    "132": "", // Espada demoníaca
    "133": "", // Hacha demoníaca.
    "134": "", // Báculo demoníaco
    "135": "", // Daga demoníaca
    "136": "", // Escudo demoníaco.
    "137": "", // Anillo demoníaco.
    "138": "", // Collar demoníaco
    "139": "", // Pico demoníaco
    "140": "", // Rey Jefe Basado Uber
    "141": "", // Jefe Majul Uber
    "142": "", // Jefe Maestruli Uber
    "143": "", // Anillo del Rey Basado en Uber
    "144": "", // Anillo Majul de Uber
    "145": "", // La Corona de Maestruli de Uber
    "146": "1-sharedassets1.assets-593.png", // Alas de Viento
    "147": "", // Isabella Jefa
    "148": "", // Anillo de Isabelle
    "149": "2-sharedassets1.assets-390.png", // Alas de Sangre
    "150": "", // Anillo Sakala
    "167": "", // Merluza Verde
    "168": "", // Pez Azul
    "169": "", // Pez limón amarillo
    "170": "", // Anchoa Roja
    "171": "", // Naranja Haddock
    "172": "", // Pargo Morado
    "173": "", // Pez dorado
    "174": "", // Solidificar Piedra
    "175": "", // Piedra Actualizadora de Nivel
    "176": "", // Piedra Olvidadora de Nombres
    "177": "", // Piedra de Re-rolleo de Valores
    "178": "", // Carnada de pesca
    "179": "", // Guantes de Aweonado
    "180": "", // Jefe La Wea
    "181": "", // Rob del jefe del bloque
    "182": "", // Anillo de Rob
    "183": "" // Botas de Rob
};
