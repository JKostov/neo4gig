
// noinspection TsLint
export const usersQuery = `
    CREATE
        (u1:User { name: "Strahinja"}), 
        (u2:User { name: "Julije"}),
        (u3:User { name: "Linus"}),
        (g1:Genre { name: "Techno"}), 
        (g2:Genre { name: "Trance"}),
        (g3:Genre { name: "House"})    
    `;
