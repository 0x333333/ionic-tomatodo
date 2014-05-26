angular.module('starter.services', [])

.factory('ColorService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  var mainColors = [
    'ALL',
    'BLUE',
    'GREEN',
    'GRAY',
    'ORANGE',
    'RED',
    'PURPLE'
  ];

  var colors = [
    {
      "name": "PLUM",
      "hex": "#913D88",
      "rgb": "145, 61, 136"
    },
    {
      "name": "SEANCE",
      "hex": "#9A12B3",
      "rgb": "154, 18, 179"
    },
    {
      "name": "MEDIUM PURPLE",
      "hex": "#BF55EC",
      "rgb": "191, 85, 236"
    },
    {
      "name": "LIGHT WISTERIA",
      "hex": "#BE90D4",
      "rgb": "190, 144, 212"
    },
    {
      "name": "STUDIO",
      "hex": "#8E44AD",
      "rgb": "142, 68, 173"
    },
    {
      "name": "WISTERIA",
      "hex": "#9B59B6",
      "rgb": "155, 89, 182"
    },
    {
      "name": "NEW YORK PINK",
      "hex": "#E08283",
      "rgb": "224, 130, 131"
    },
    {
      "name": "POMEGRANATE",
      "hex": "#F22613",
      "rgb": "242, 38, 19"
    },
    {
      "name": "RED",
      "hex": "#FF0000",
      "rgb": "255, 0, 0"
    },
    {
      "name": "SUNGLO",
      "hex": "#E26A6A",
      "rgb": "226, 106, 106"
    },
    {
      "name": "THUNDERBIRD",
      "hex": "#D91E18",
      "rgb": "217, 30, 24"
    },
    {
      "name": "OLD BRICK",
      "hex": "#96281B",
      "rgb": "150, 40, 27"
    },
    {
      "name": "FLAMINGO",
      "hex": "#EF4836",
      "rgb": "239, 72, 54"
    },
    {
      "name": "VALENCIA",
      "hex": "#D64541",
      "rgb": "214, 69, 65"
    },
    {
      "name": "TALL POPPY",
      "hex": "#C0392B",
      "rgb": "192, 57, 43"
    },
    {
      "name": "MONZA",
      "hex": "#CF000F",
      "rgb": "207, 0, 15"
    },
    {
      "name": "CINNABAR",
      "hex": "#E74C3C",
      "rgb": "231, 76, 60"
    },
    {
      "name": "TAHITI GOLD",
      "hex": "#E87E04",
      "rgb": "232, 126, 4"
    },
    {
      "name": "CASABLANCA",
      "hex": "#F4B350",
      "rgb": "244, 179, 80"
    },
    {
      "name": "CRUSTA",
      "hex": "#F2784B",
      "rgb": "242, 120, 75"
    },
    {
      "name": "JAFFA",
      "hex": "#EB974E",
      "rgb": "235, 151, 78"
    },
    {
      "name": "LIGHTNING YELLOW",
      "hex": "#F5AB35",
      "rgb": "245, 171, 53"
    },
    {
      "name": "SAFFRON",
      "hex": "#F4D03F",
      "rgb": "244, 208, 63"
    },
    {
      "name": "BURNT ORANGE",
      "hex": "#D35400",
      "rgb": "211, 84, 0"
    },
    {
      "name": "BUTTERCUP",
      "hex": "#F39C12",
      "rgb": "243, 156, 18"
    },
    {
      "name": "ECSTASY",
      "hex": "#F9690E",
      "rgb": "249, 105, 14"
    },
    {
      "name": "RIPE LEMON",
      "hex": "#F7CA18",
      "rgb": "247, 202, 24"
    },
    {
      "name": "SAFFRON",
      "hex": "#F9BF3B",
      "rgb": "249, 191, 59"
    },
    {
      "name": "JAFFA",
      "hex": "#F27935",
      "rgb": "242, 121, 53"
    },
    {
      "name": "ZEST",
      "hex": "#E67E22",
      "rgb": "230, 126, 34"
    },
    {
      "name": "FIRE BUSH",
      "hex": "#EB9532",
      "rgb": "235, 149, 50"
    },
    {
      "name": "CARARRA",
      "hex": "#F2F1EF",
      "rgb": "242, 241, 239"
    },
    {
      "name": "PUMICE",
      "hex": "#D2D7D3",
      "rgb": "210, 215, 211"
    },
    {
      "name": "GALLERY",
      "hex": "#EEEEEE",
      "rgb": "238, 238, 238"
    },
    {
      "name": "SILVER SAND",
      "hex": "#BDC3C7",
      "rgb": "189, 195, 199"
    },
    {
      "name": "PORCELAIN",
      "hex": "#ECF0F1",
      "rgb": "236, 240, 241"
    },
    {
      "name": "CASCADE",
      "hex": "#95A5A6",
      "rgb": "149, 165, 166"
    },
    {
      "name": "IRON",
      "hex": "#DADFE1",
      "rgb": "218, 223, 225"
    },
    {
      "name": "EDWARD",
      "hex": "#ABB7B7",
      "rgb": "171, 183, 183"
    },
    {
      "name": "SILVER",
      "hex": "#BFBFBF",
      "rgb": "191, 191, 191"
    },
    {
      "name": "DOWNY",
      "hex": "#65C6BB",
      "rgb": "101, 198, 187"
    },
    {
      "name": "MOUNTAIN MEADOW",
      "hex": "#1BBC9B",
      "rgb": "27, 188, 155"
    },
    {
      "name": "LIGHT SEA GREEN",
      "hex": "#1BA39C",
      "rgb": "27, 163, 156"
    },
    {
      "name": "MEDIUM AQUAMARINE",
      "hex": "#66CC99",
      "rgb": "102, 204, 153"
    },
    {
      "name": "TURQUOISE",
      "hex": "#36D7B7",
      "rgb": "54, 215, 183"
    },
    {
      "name": "OBSERVATORY",
      "hex": "#049372",
      "rgb": "4, 147, 114"
    },
    {
      "name": "MADANG",
      "hex": "#C8F7C5",
      "rgb": "200, 247, 197"
    },
    {
      "name": "RIPTIDE",
      "hex": "#86E2D5",
      "rgb": "134, 226, 213"
    },
    {
      "name": "SHAMROCK",
      "hex": "#2ECC71",
      "rgb": "46, 204, 113"
    },
    {
      "name": "MOUNTAIN MEADOW",
      "hex": "#16A085",
      "rgb": "22, 160, 133"
    },
    {
      "name": "EMERALD",
      "hex": "#3FC380",
      "rgb": "63, 195, 128"
    },
    {
      "name": "GREEN HAZE",
      "hex": "#019875",
      "rgb": "1, 152, 117"
    },
    {
      "name": "JUNGLE GREEN",
      "hex": "#26C281",
      "rgb": "38, 194, 129"
    },
    {
      "name": "FREE SPEECH AQUAMARINE",
      "hex": "#03A678",
      "rgb": "3, 166, 120"
    },
    {
      "name": "OCEAN GREEN",
      "hex": "#4DAF7C",
      "rgb": "77, 175, 124"
    },
    {
      "name": "JUNGLE GREEN",
      "hex": "#2ABB9B",
      "rgb": "42, 187, 155"
    },
    {
      "name": "JADE",
      "hex": "#00B16A",
      "rgb": "0, 177, 106"
    },
    {
      "name": "SALEM",
      "hex": "#1E824C",
      "rgb": "30, 130, 76"
    },
    {
      "name": "EUCALYPTUS",
      "hex": "#26A65B",
      "rgb": "38, 166, 91"
    },
    {
      "name": "PICTON BLUE",
      "hex": "#59ABE3",
      "rgb": "89, 171, 227"
    },
    {
      "name": "SHAKESPEARE",
      "hex": "#52B3D9",
      "rgb": "82, 179, 217"
    },
    {
      "name": "HUMMING BIRD",
      "hex": "#C5EFF7",
      "rgb": "197, 239, 247"
    },
    {
      "name": "PICTON BLUE",
      "hex": "#22A7F0",
      "rgb": "34, 167, 240"
    },
    {
      "name": "CURIOUS BLUE",
      "hex": "#3498DB",
      "rgb": "52, 152, 219"
    },
    {
      "name": "MADISON",
      "hex": "#2C3E50",
      "rgb": "44, 62, 80"
    },
    {
      "name": "JORDY BLUE",
      "hex": "#89C4F4",
      "rgb": "137, 196, 244"
    },
    {
      "name": "DODGER BLUE",
      "hex": "#19B5FE",
      "rgb": "25, 181, 254"
    },
    {
      "name": "MING",
      "hex": "#336E7B",
      "rgb": "51, 110, 123"
    },
    {
      "name": "EBONY CLAY",
      "hex": "#22313F",
      "rgb": "34, 49, 63"
    },
    {
      "name": "MALIBU",
      "hex": "#6BB9F0",
      "rgb": "107, 185, 240"
    },
    {
      "name": "CURIOUS BLUE",
      "hex": "#1E8BC3",
      "rgb": "30, 139, 195"
    },
    {
      "name": "CHAMBRAY",
      "hex": "#3A539B",
      "rgb": "58, 83, 155"
    },
    {
      "name": "PICKLED BLUEWOOD",
      "hex": "#34495E",
      "rgb": "52, 73, 94"
    },
    {
      "name": "HOKI",
      "hex": "#67809F",
      "rgb": "103, 128, 159"
    },
    {
      "name": "JELLY BEAN",
      "hex": "#2574A9",
      "rgb": "37, 116, 169"
    },
    {
      "name": "JACKSONS PURPLE",
      "hex": "#1F3A93",
      "rgb": "31, 58, 147"
    },
    {
      "name": "STEEL BLUE",
      "hex": "#4B77BE",
      "rgb": "75, 119, 190"
    },
    {
      "name": "FOUNTAIN BLUE",
      "hex": "#5C97BF",
      "rgb": "92, 151, 191"
    }
  ];

  return {
    // all: function() {
    //   return pets;
    // },
    // get: function(petId) {
    //   // Simple index lookup
    //   return pets[petId];
    // }
    getMainColors: function() {
      return mainColors;
    },
    getColors: function() {
      return colors;
    }
  };
});