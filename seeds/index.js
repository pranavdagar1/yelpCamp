const cities=require('./cities');
const mongoose=require('mongoose');
const{places,descriptors}=require('./seedHelper')
const Campground=require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log("CONNECTION OPEN!!!!");
})
.catch(err=>{
console.log(" ERROR OCCURED");
console.log(err);
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];
const seedDb=async()=>{
    await Campground.deleteMany({});
    const c=new Campground({title:"purple field"});
    for(let i=0; i<200; i++){
        random1000= Math.floor(Math.random()*1000);
        console.log(`Random Index: ${random1000}, City Data:`, cities[random1000]);
        const price=Math.floor(Math.random()*20)+10;
       const camp=  new Campground({
                // YOUR USER ID
                author:'679e508c4b48482d2d0675a4',
                location:`${cities[random1000].city},${cities[random1000].state}`,
                title:`${sample(descriptors)} ${sample(places)}`,
                description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae sapiente quam tempora voluptates eius, corporis, doloribus aliquam earum aperiam architecto repellat eveniet voluptas exercitationem. Voluptates dolor debitis vel laudantium!',
                price,
                geometry:{type:"Point",
                  coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
                },
                images: [ {
                    url: 'https://res.cloudinary.com/dtviug4t4/image/upload/v1739551359/yelpcamp/qjawn3sjcvdpqis4vgyc.jpg',
                    filename: 'yelpcamp/qjawn3sjcvdpqis4vgyc',
                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dtviug4t4/image/upload/v1739551360/yelpcamp/kp21yvckhf47c70yhmgr.jpg',
                    filename: 'yelpcamp/kp21yvckhf47c70yhmgr',
                    
                  },
                  {
                    url: 'https://res.cloudinary.com/dtviug4t4/image/upload/v1739551360/yelpcamp/qb57istvqi5lf3ln2moz.jpg',
                    filename: 'yelpcamp/qb57istvqi5lf3ln2moz',
                    
                  }]
                        })
                        await camp.save();
    }
}
seedDb().then(()=>{
    mongoose.connection.close();
})
