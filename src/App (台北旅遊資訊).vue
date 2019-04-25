<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="content">
        <div class="clearfix"></div>
        <div class="search-side">
            <div class="location">
                <div class="location-title "><span class="text  ">Location</span></div>
                <div class="col-auto my-1 selectLocation">
	                            <select class="custom-select mr-sm-2 select" @change="searchAttration(selectArea)"v-model="selectArea">
                                    <option value="" selected="selected"></option>
                                    <option v-for="(area,index) in areas" :value="index"  selected>{{ area }}</option>
                                </select>


                </div>


            </div>
            <div class="date">
                <div class="date-title"><span class="text ">Date</span></div>

                <div class="date-time"><label class="date-from-to">from</label> <input class="searchtime" /></div>
                <div class="date-time"> <label class="date-from-to">to</label> <input class="searchtime" /></div>

            </div>
            <div class="categories">
                <div class="categories-title"><span class="text">Categories</span></div>
                <div class="custom-control custom-checkbox all" v-for="(categorie,index) in categories">
                    <input type="checkbox" @change="selectCategories($event,index)"class="custom-control-input" :id="index">
                    <label class="custom-control-label" :for="index">{{categorie}}</label>
                </div>
            </div>
        </div>

        <div class="post-list">
            <div class="post-result">Showing<span class="post-number">{{this.attractions.length}}</span> result by...</div>
            <div class="post-search"><span class="post-tag">Koahsiung<i class="far fa-times-circle"></i></span></div>
            <div class="post-article" v-for="(attr,index) in attractions">
                <div class="post-img"></div>
                <div class="post-content">
                    <div class="post-title">{{attr.stitle}}</div>
                    <div class="post-text">{{attr.xbody}}</div>
                    <div class="br-line"><span class="post-user">{{attr.idpt}}</span><span class="post-tag2">{{attr.CAT2}}</span></div>
                    <div class="br-line"><span class="post-location"><i class="fas fa-map-marker-alt"></i>{{attr.MRT}}</span><span class="post-time"><i class="far fa-calendar-alt"></i>{{attr.xpostDate}}</span></div>
                </div>
            </div>

            <nav aria-label="Page navigation example " class="post-navigation ">
                <ul class="pagination ">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>


    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
let url="http://localhost:3000/XML_Head";
// let url="C:/Users/User/Desktop/網頁-精神時光屋/taipei-travel/taipei-travel.json";

export default {
  name: 'App',
  data() {
      return {
          attractions:[],
        //   area : {"中正區":"100","大同區":"103","中山區":"104","松山區":"105","大安區":"106","萬華區":"108","信義區":"110","士林區":"111","北投區":"112","內湖區":"114","南港區":"115","文山區":"116"},
          areas: ["中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區"],
          categories:["全部","養生溫泉","藍色公路","歷史建築","藝文館所","單車遊蹤","戶外踏青","宗教信仰","其　　他","親子共遊","公共藝術"],
          selectArea:'',
          selectCate:[],
      }
  },
  components:{
    Navbar,
  },
  mounted() {


      },
  methods: {
      searchAttration(selectArea){
          this.attractions=[];
          this.selectArea =selectArea;
          fetch(url)
                .then((response) => {
                    return response.json();
                }).then((jsonData) => {
                    console.log(jsonData);
                    let  places =jsonData.results
                    for(let i =0 ; i<places.length ;i++){
                        if(places[i].address.includes(this.areas[selectArea]))
                            this.attractions.push(places[i])

                    }
                    console.log(this.attractions );
                }).catch((err) => {
                    console.log('錯誤:', err);
                });
      },
      selectCategories($event,index){

            $event.target.checked?this.selectCate.push(this.categories[index]):this.selectCate.splice(this.selectCate.indexOf(this.categories[index]),1)
            this.attractions=[];
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((jsonData) => {
                    // console.log(jsonData);
                    let  places =jsonData.results
                    if(this.selectCate.length==0){
                        for(let i =0 ; i<places.length ;i++){
                              if(places[i].address.includes(this.areas[this.selectArea]))
                                    this.attractions.push(places[i])
                        }
                    }else{
                        for(let i =0 ; i<places.length ;i++){
                         if(places[i].address.includes(this.areas[this.selectArea] ) && this.selectCate.some((item, index, array)=> item===places[i].CAT2))
                                this.attractions.push(places[i])
                        }
                    }
                    console.log(this.attractions );
                }).catch((err) => {
                    console.log('錯誤:', err);
                });

      }


  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,700,900');


.location-title {
    flex: 1;
    height: 24px;
    padding-top: 13px;
    font-size: 20px;
}

.location {
    display: flex;
    height: 127px;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: solid 1px #D7D7D7;
}

.selectLocation {
    padding-left: 0px;
    padding-right: 0px;
    flex: 1;
    height: 40px;
    /* overflow:hidden;*/

    padding-top: 11px;
    padding-bottom: 20px;
    margin: 0px;


}

.selectLocation .select {
    /*    overflow: hidden;*/
    width: 220px;
    flex: 1;
    height: 40px;
    padding: 0px;
}


.date {
    border-bottom: solid 1px #D7D7D7;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
    height: 187px;



}


.date-time {
    width: 220px;
    flex: 1;
    display: flex;
    height: 40px;
}

.date-title {
    flex: 1;
    display: inline;

    height: 24px;
/*    width: 51px;*/

    padding-top: 13px;


}

.searchtime {
    flex: 1;
    display: inline;
    height: 40px;
    width: 169px;
    font-size: 24px;

}

.date-from-to {
    width: 50px;
    margin-bottom: 0rem;
    /*    float: right;*/
    height: 40px;
}

.categories {
    padding-left: 40px;
    padding-right: 40px;
    height: 450px;

}

.categories-title {
    padding-top: 26px;
    padding-bottom: 46px;
}

.custom-control.custom-checkbox {
    margin-top:4px;
}

.custom-control.custom-checkbox.all {
    padding-top: 0px;
}


/*--------------------------------------*/
.text {
    /*    box-sizing: border-box;*/
    position: absolute;
    font-family: 'Roboto Italic ', sans-serif;
    font-size: 20px;
    font-weight: bold;
    height: 24px;
    /*        justify-content: center;*/
    /*        align-content: center;*/
    /*    padding-left: 40px;*/
    /*        padding-top: 24px;*/

}

/*----------------*/
.content {
    background: #ffffff;
    display: flex;
    flex-direction: row;
    margin-left: 3.33%;
    margin-right: 3.33%;
    /*position: relative;*/
    height: 100%;
}

/*
* {
    border: solid 1px #000;
}
*/

.search-side {

    background-color: #F2F2F2;
    flex: 3;
    display: flex;
    flex-direction: column;
    width: 25%;
    max-width: 300px;
    height: 100%;
}

.post-list {
    flex: 7;
    display: flex;
    flex-direction: column;
    /*    align-items: flex-start;*/
    background-color: #fff;


    margin-left: 3.33%;
    padding-top: 24px;
    width: 65%;
}

.post-result {
    font-family: 'Roboto-Italic', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #000;


}

.post-number {
    font-family: 'Roboto Italic ', sans-serif;
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    color: #9013FE;
}

.post-search {
    color: #9013FE;
    margin-top: 16px;
    height: 35px;
}

.post-tag {
    border-radius: 16px;
    font-style: italic;
    border-color: #9013FE;
    border: solid 1.1px #9013FE;
    padding: 8px;
    width: 100%;
    padding-right: 8px;
}

.post-tag2 {
    border-radius: 16px;
    font-style: italic;
    border-color: #D7D7D7;
    /*    border: solid 1.1px #9013FE;*/
    color: #fff;
    padding: 4px;
    width: 100%;
    font-size: 12px;
    padding-right: 8px;
    background: #D7D7D7;

}

.post-article {
    display: flex;
    flex-direction: row;
    /*    max-width: 780px;*/
    width: 100%;
    /*    height: 220px;*/

    margin-top: 24px;
    background-color: aqua;
}

.post-img {
    /*    max-width: 220px;*/
    width: 28.3%;
    /*    height: 220px;*/
    background-color: antiquewhite;
    background-image: url(./000.jpg);
    background-size: cover;
    background-position: center center;
}



.post-content {
    /*    max-width: 560px;*/
    width: 71.7%;
    height: 220px;
    height: 100%;
    background-color: #fff;
    padding: 24px 20px;
    font-size: 16px;
    border: solid 1px #97c3f3;

}

.post-title {
    font-size: 24px;
    font-weight: bold;
    color: #9013FE;
}

.post-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    margin-top: 16px;
}

.post-location {
    color: #9B9B9B;
    margin-right: 20px;
    margin-right: 8px;
}

.post-time {
    color: #9B9B9B;
}

.post-user {
    margin-right: 20px;
    font-weight: bold;
    margin-top: 16px;
}

.post-navigation ul.pagination {
    margin-top: 24px;
    justify-content: flex-end !important;
}

.br-line {
    margin-top: 16px;
}

.fa-times-circle {
    padding-left: 8px;
}

.fa-map-marker-alt {
    color: #000;
    margin-right: 8px;
}

.fa-calendar-alt {
    color: #000;
    margin-right: 8px;

}






/*-------------------------------------------------------------------------------------------------*/
html {
    /*    background: #e6e9e9;*/
    background-image: linear-gradient(270deg, rgb(230, 233, 233) 0%, rgb(216, 221, 221) 100%);
    /*    -webkit-font-smoothing: antialiased;*/
}

body {
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.06);
    color: #545454;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 auto;
    /*    max-width: 800px;*/
    /*    padding: 2em 2em 4em;*/
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: #222;
    font-weight: 700;
    line-height: 1.3;
}

h2 {
    margin-top: 1.3em;
}

a {
    color: #0083e8;
}

b,
strong {
    font-weight: 700;
}

samp {
    display: none;
}

img {
    animation: colorize 2s cubic-bezier(0, 0, .78, .36) 1;
    background: transparent;
    border: 10px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    display: block;
    margin: 1.3em auto;
    max-width: 95%;
}

@keyframes colorize {
    0% {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }

    100% {
        -webkit-filter: grayscale(0%);
        filter: grayscale(0%);
    }
}

</style>
<style  src="../src/assets/css/media.css">

</style>