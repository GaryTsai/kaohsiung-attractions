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
                                    <option value="" selected="selected">請選擇行政區</option>
                                    <option v-for="(area,index) in Object.keys(area_data)" :value="index"  selected>{{ area }}</option>
                                </select>
                </div>
            </div>
            <!-- We can search the result use time zone search when attractions have time restrict -->

            <!-- <div class="date">
                <div class="date-title"><span class="text ">Date</span></div>

                <div class="date-time"><label class="date-from-to">from</label> <input class="searchtime" /></div>
                <div class="date-time"> <label class="date-from-to">to</label> <input class="searchtime" /></div>

            </div> -->
            <!-- <div class="categories">
                <div class="categories-title"><span class="text">Categories</span></div>
                <div class="custom-control custom-checkbox all" v-for="(categorie,index) in categories">
                    <input type="checkbox" @change="selectCategories($event,index)"class="custom-control-input" :id="index">
                    <label class="custom-control-label" :for="index">{{categorie}}</label>
                </div>
            </div> -->
        </div>
        <div class="post-list" v-bind:class="{singlecontent:!singleArticleShow}" >
            <div class="post-result">Showing  <span class="post-number">{{this.attractions.length}}</span> result by...</div>
            <div class="post-search" v-if="this.selectArea==''?false:true"><span class="post-tag">{{Object.keys(this.area_data)[this.selectArea]}}</span><span class="returnAllPage" @click="returnAll" v-if="!singleArticleShow">back</span></div>
            <div class="post-article" v-for="(attr,index) in attractions"  v-if="singleArticleShow">
                <img class="post-img " :src="attr.Picture1"  data-toggle="modal" :data-target="`#${attr.Id}`">
                <div class="post-content">
                    <div class="post-title">{{attr.Name}}</div>
                    <div class="post-text" style=" -webkit-box-orient: vertical;">{{attr.Toldescribe}}</div>
                    <a @click="attractionInfo(attr)" href="javascript:;">(繼續閱讀...)</a>
                    <div class="br-line"><span class="post-user">{{attr.Ticketinfo}}</span><span class="post-tag2">{{attr.Zone}}</span></div>
                    <div class="br-line"><span class="post-location"><i class="fas fa-map-marker-alt"></i>{{attr.Picdescribe1}}</span><span class="post-time"><i class="far fa-calendar-alt"></i>{{attr.Opentime}}</span></div>
                </div>

                <div :id="attr.Id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog"  >
                    <div class="modal-content">
                        <div class="modal-body">

                            <img :src="attr.Picture1"  class="imgPop">
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- We can use categories when more detail about area  -->

            <!-- <nav aria-label="Page navigation example " class="post-navigation ">
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
            </nav> -->
        </div>


    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
    // let url="https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=400";
    let TravelRef= firebase.database().ref('/result/' );

export default {
  name: 'App',
  data() {
      return {
          attractions:[],
          data:[],
area_data: {"新興區":"800","前金區":"801","苓雅區":"802","鹽埕區":"803","鼓山區":"804","旗津區":"805","前鎮區":"806","三民區":"807","楠梓區":"811","小港區":"812","左營區":"813","仁武區":"814","大社區":"815","岡山區":"820","路竹區":"821","阿蓮區":"822","田寮區":"823","燕巢區":"824","橋頭區":"825","梓官區":"826","彌陀區":"827","永安區":"828","湖內區":"829","鳳山區":"830","大寮區":"831","林園區":"832","鳥松區":"833","大樹區":"840","旗山區":"842","美濃區":"843","六龜區":"844","內門區":"845","杉林區":"846","甲仙區":"847","桃源區":"848","那瑪夏":"849","茂林區":"851","茄萣區":"852"},
          selectArea:'',
          selectCate:[],
          singleArticleShow:true,
      }
  },
  components:{
    Navbar,
  },
  mounted() {
      //initial the data after binding DOM element
        let vm =this;
        let item=[];
        TravelRef.on('value', function(snapshot) {
            snapshot.forEach(element => {
                item.unshift(element.val());
            });
            vm.data = item;
            });
        },
  methods: {
      //Search the Area
      searchAttration(selectArea){
        let vm =this;
    //   Handle when selectarea in single page event
        vm.singleArticleShow=true;
        let single=document.querySelector('.post-article-single');
        single?single.remove():'';
    //empty origin content
        vm.attractions=[];
        vm.selectArea =selectArea;
        for(let i =0 ; i<vm.data.length ;i++){
            if(vm.data[i].Add.includes(Object.keys(vm.area_data)[selectArea]))
                vm.attractions.push(vm.data[i])
        }
      },
      //Attraction personal page
      attractionInfo(attr){
        this.singleArticleShow=false;
        let SingleArticle=`
            <div class="post-article-single " >

                <img class="post-img-single" src="${attr.Picture1}"  data-toggle="modal" data-target="#${attr.Id}+1">
                <div class="post-content-single ">
                    <div class="post-title">${attr.Name}</div>
                    <div class="post-text-single">${attr.Toldescribe}</div>
                    <div class="br-line"><span class="post-user">${attr.Ticketinfo}</span><span class="post-tag2">${attr.Zone}</span></div>
                    <div class="br-line"><span class="post-location"><i class="fas fa-map-marker-alt"></i>${attr.Picdescribe1}</span><span class="post-time"><i class="far fa-calendar-alt"></i>${attr.Opentime}</span></div>
                </div>

                <div id="${attr.Id}+1" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog"  >
                    <div class="modal-content">
                        <div class="modal-body">

                            <img :src="attr.Picture1"  class="imgPop">
                        </div>
                    </div>
                </div>
                </div>`;
                let post=document.querySelector('.post-list');
                $('.post-list').append(SingleArticle);
      },
      //return search area result page
      returnAll(){
          document.querySelector('.post-article-single').remove();
          this.singleArticleShow=true;
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,700,900');
</style>

<style  src="../src/assets/css/main.css"></style>
<style  src="../src/assets/css/media.css"></style>