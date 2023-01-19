// // import productImg01 from "../gallary-1.jpg";
// // import productImg02 from "../gallary-2.jpg";
// // import productImg03 from "../gallary-3.jpg";

// // import productImg04 from "../gallary-4.jpg";
// // import productImg05 from "../gallary-5.jpg";
// // import productImg06 from "../gallary-6.jpg";
// // import productImg007 from "../pic.png";

// // import productImg07 from "../Pic1.jpg";
// // import productImg08 from "../Product1111.png";
// // import productImg09 from "../gallary-6.jpg";
// // import productImg13 from "../gallary-1.jpg";

import {useState,useEffect} from 'react';
import { db } from "../../firebase.config"; 
import { collection, onSnapshot,} from "firebase/firestore"; 


function Products(){
    const [info,setInfo] = useState([]); 
    console.log('info is : ==== ', info)
  
  useEffect(()=>{
    const unsub = onSnapshot(
        collection(db,"products"), 
        (snapShot) =>{
            let list = []; 
            snapShot.docs.forEach((doc)=>{
                list.push({id:doc.id, ...doc.data() }); 
            });
            setInfo(list); 
        }, 
        (error)=>{
            console.log(error); 
        }
    );
    return ()=>{
        unsub(); 
    };
  },[])
    const products=[
    {
        id:`${info.id}`, 
        productName: `${info.productName}`,
        imgUrl : `${info.imgUrl}`,
        category:`${info.category}`,
        price:`${info.price}`,

    }
  ]
 
}



// // const products = [
// //   {
// //     id: "01",
// //     productName: "Stone and Beam Westview ",
// //     imgUrl: productImg01,
// //     category: "sharee",
// //     price: 193,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.7,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.5,
// //   },

// //   {
// //     id: "02",
// //     productName: "Rivet Bigelow Modern ",
// //     imgUrl: productImg02,
// //     category: "sharee",
// //     price: 253,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.8,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.8,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "03",
// //     productName: "Amazon Brand Modern Sofa",
// //     imgUrl: productImg03,
// //     category: "sharee",
// //     price: 173,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "26",
// //     productName: "Rivet Bigelow Modern ",
// //     imgUrl: productImg02,
// //     category: "sharee",
// //     price: 253,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.8,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.8,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "04",
// //     productName: "Fllufy Sheep Sofa",
// //     imgUrl: productImg04,
// //     category: "sharee",
// //     price: 163,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "05",
// //     productName: "Faux Velvet Sofa",
// //     imgUrl: productImg05,
// //     category: "gown",
// //     price: 163,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "06",
// //     productName: "Fllufy Sheep Sofa",
// //     imgUrl: productImg06,
// //     category: "gown",
// //     price: 163,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "07",
// //     productName: "Sakarias Armchair",
// //     imgUrl: productImg07,
// //     category: "gown",
// //     price: 99,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "27",
// //     productName: "Modern Arm Sofa",
// //     imgUrl: productImg007,
// //     category: "sharee",
// //     price: 173,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "08",
// //     productName: "Baltsar Chair",
// //     imgUrl: productImg08,
// //     category: "gown",
// //     price: 89,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "09",
// //     productName: "Helmar Chair",
// //     imgUrl: productImg09,
// //     category: "gown",
// //     price: 112,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },

// //   {
// //     id: "10",
// //     productName: "Apple iPhone 12 Pro",
// //     imgUrl: productImg13,
// //     category: "modest",
// //   },
// //   {
// //     id: "09",
// //     productName: "Helmar Chair",
// //     imgUrl: productImg09,
// //     category: "upcoming",
// //     price: 112,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "09",
// //     productName: "Helmar Chair",
// //     imgUrl: productImg09,
// //     category: "gown",
// //     price: 112,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "09",
// //     productName: "Helmar Chair",
// //     imgUrl: productImg09,
// //     category: "gown",
// //     price: 112,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// //   {
// //     id: "08",
// //     productName: "Baltsar Chair",
// //     imgUrl: productImg08,
// //     category: "upcoming",
// //     price: 89,
// //     shortDesc:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
// //     description:
// //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
// //     reviews: [
// //       {
// //         rating: 4.6,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //       {
// //         rating: 4.9,
// //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //       },
// //     ],
// //     avgRating: 4.7,
// //   },
// // ];


export default Products;