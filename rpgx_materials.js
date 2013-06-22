({
    /*
      Ideally these should be (relatively) realistic:

      hardness (Vickers) / 10 
      density (g/cm^3) *10
      resistance (nΩ·m) / 5
      thermal 100/(W·m−1·K−1)
      opacity (opaque%)

      Mark details where this has been looked up with //(*)

      Put //fictional for non-real materials, e.g.:

      dragontooth: 
      {
      // fictional
          hardness: ...
          ...       
      }
      
      

    */
    materials: 
    {
        birch:
        {
            name: "Birch Wood",
            type: "wood",
            strength: 7,
            sharpness: 5,
            density: 5
        }
        ,
        ebony:
        {
            name: "Ebony Wood",
            type: "wood",
            strength: 35,
            sharpness: 10,
            density: 14
        }
        ,
        oak:
        {
            name: "Oak Wood",
            type: "wood",
            strength: 20,
            sharpness: 8,
            density: 8
        }
        ,
        ivory:
        {
            name: "Ivory",
            type: "bone",
            strength: 30,
            sharpness: 80,
            density: 15,
        }
        ,
        wdscale:
        {
            name: "White Dragon Scale",
            type: "scale",
            strength: 70,
            sharpness: 20,
            density: 15
        }
        ,
        wdfang:
        {
            name: "White Dragon Fang",
            type: "bone",
            strength: 10,
            sharpness: 60,
            density: 20
        }
        ,
        firedscale:
        {
            name: "Fire Dragon Scale",
            type: "scale",
            strength: 60,
            sharpness: 20,
            density: 35
        }
        ,
        firedfang:
        {
            name: "Fire Dragon Fang",
            type: "bone",
            strength: 30,
            sharpness: 80,
            density: 45            
        }
        ,
        sdscale:
        {
            name: "Sky Dragon Scale",
            type: "scale",
            strength: 50,
            sharpness: 15,
            density: 8,
        }
        ,
        sdfang:
        {
            name: "Sky Dragon Fang",
            type: "fang",
            strength: 15,
            sharpness: 40,
            density: 12
        }
        ,
        iron:
        {
            name: "Iron",
            type: "metal",
            strength: 60,
            sharpness: 40,
            density: 80
        }
        ,
        copper:
        {
            name: "Copper",
            type: "metal",
            strength: 40,
            sharpness: 30,
            density: 70
        }
        ,

        gold:
        {
            name: "Gold",
            type: "metal",
            strength: 20,
            sharpness: 10,
            density: 40
        }
        ,
        silver:
        {
            name: "Silver",
            type: "metal",
            strength: 25,
            sharpness: 10,
            density: 40
        }
        ,
        steel:
        {
            name: "Steel",
            type: "metal",
            strength: 155,
            sharpness: 60,
            density: 95
        }
        ,
        hgsteel:
        {
            name: "High-Grade Steel",
            type: "metal",
            strength: 300,
            sharpness: 70,
            density: 100
        }
        ,
        ti:
        {
            name: "Titanium"
            strength: 90,
            sharpness: 50,
            density: 40
        }
        ,
        ametal:
        {
            name: "Amorphorous Metal Alloy",
            type: "metal"
            strength: 125,
            sharpness: 350,
            density: 85
        }
        ,
        diamond:
        {
            name: "Diamond",
            type: "gem"
            strength: 400,
            sharpness: 500,
            density: 40
        }
        ,
        brass:
        {
            name: "Brass",
            type: "metal",
            strength: 140,
            sharpness: 60,
            density: 90
        }
        ,
        ruby:
        {
            name: "Ruby",
            type: "gem"
            strength: 100,
            sharpness: 250,
            density: 40
        }
        ,
        leather:
        {
            name: "Leather",
            type: "hide",
            strenth: 30,
            sharpness: 0,
            density: 5         
        }
        ,
        snakeskin:
        {
            name: "Snakeskin",
            type: "hide",
            strength: 25,
            sharpness: 5,
            density: 22
        }
        ,
        cotton:
        {
            name: "Cotton",
            type: "cloth",
            strength: 8,
            sharpness: 0,
            density: 3
        }
    }

})
