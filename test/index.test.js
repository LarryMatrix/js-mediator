// // const app = require('../server');
// // const supertest = require('supertest');
// // const index = require('../index')
//
//
//
// // beforeEach((done) => {
// //     const app = index.listen(5000, async (done) => {
// //         console.log("Server has started!");
// //     });
// //
// // });
//
//
// // test('GET /mediator', async () => {
// //     const post = await Post.create(
// //         {
// //             admin_node: 'TZ',
// //             country: 'Tanzania',
// //             country_code: 'TZ'
// //         }
// //     );
// //
// //     await supertest(app).get('/mediator')
// //         .expect(200)
// //         .then((response) => {
// //             // Check type and length
// //             expect(Object(response.body)).toBeTruthy();
// //             expect(Array.isArray(response.body.AdminHierarchy)).toBeTruthy();
// //             expect(response.body.AdminHierarchy.length).toBeGreaterThan(1);
// //
// //             // Check data
// //             expect(response.body.AdminHierarchy[0].admin_node).toBe(post.admin_node);
// //             expect(response.body.AdminHierarchy[0].country).toBe(post.country);
// //             expect(response.body.AdminHierarchy[0].country_code).toBe(post.country_code);
// //
// //             // expect(Array.isArray(response.body)).toBeTruthy();
// //             // expect(response.body.length).toEqual(1);
// //         });
// // });
//
//
// jest.mock('/mediator', () => {
//     return {
//         baseURL: 'https://jsonplaceholder.typicode.com/albums',
//         request: jest.fn().mockResolvedValue({
//             data: [
//                 {
//                     albumId: 3,
//                     id: 101,
//                     title: 'incidunt alias vel enim',
//                     url: 'https://via.placeholder.com/600/e743b',
//                     thumbnailUrl: 'https://via.placeholder.com/150/e743b'
//                 },
//                 {
//                     albumId: 3,
//                     id: 102,
//                     title: 'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
//                     url: 'https://via.placeholder.com/600/a393af',
//                     thumbnailUrl: 'https://via.placeholder.com/150/a393af'
//                 },
//                 {
//                     albumId: 3,
//                     id: 103,
//                     title: 'et eius nisi in ut reprehenderit labore eum',
//                     url: 'https://via.placeholder.com/600/35cedf',
//                     thumbnailUrl: 'https://via.placeholder.com/150/35cedf'
//                 }
//             ]
//         }),
//     }
// });