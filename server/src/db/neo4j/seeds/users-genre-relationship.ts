export const usersGenreRelationshipQuery = 'MATCH (u1:User { name: "Strahinja" }), (g1:Genre { name: "Rock" }) CREATE (u1)-[r1:INTERESTED_INTO]->(g1);';
