// export function getAllShopIds() {
//     const fileNames = fs.readdirSync(shopDirectory);
//     return fileNames.map(fileName => {
//         return {
//             params: {
//                 id: fileName.replace(/\.md$/, '')
//             }
//         };
//     });
// }


// export function getShopData(id) {
//     const fullPath = path.jointShopDirectory, (`${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Combine the data with the id
//     return {
//         id,
//         ...matterResult.data,
//     };
// }