
// noinspection TsLint
export const createQuery = `
    CREATE
        (u1:User { name: "Strahinja"}), 
        (u2:User { name: "Julije", isMusician: true, instrument: "Guitar"}),
        (u3:User { name: "Linus, isMusician: true, instrument: "Piano"}),
        (g1:Genre { name: "Rock", description: "Rock music is a broad genre of popular music that originated as 'rock and roll' in the United States in the early 1950s."}), 
        (g2:Genre { name: "Grunge", description: "Grunge (sometimes referred to as the Seattle sound) is the music genre formed from the fusion of punk rock and heavy metal"}),
        (g3:Genre { name: "Metal", description: "Heavy metal (or simply metal) is a genre of rock music that developed in the late 1960s and early 1970s, largely in the United Kingdom."}),
        (i1:Gig { name: "Naissus RockNRoll", city: "Nis"}), 
        (i2:Gig { name: "BlackMetal Fest", city: "Belgrade"}),
        (i3:Gig { name: "Metal Forest", city: "Novi Sad"})       
    `;
