<template>
  <div >
      <nav class="navbar navbar-light bg-purple">
        <div class="logo-brand"></div>
        <div class="navbar-flex">
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-------------------------------*/
.bg-purple {

    width: 100%;
    background-color: #7828B4;
    background: #7828B4;
    color: #fff;
    display: flex;
    flex-direction: row;
    /*    justify-content:;*/
    height: 92px;

}

.navbar-flex {
    flex: 3;
}

.logo-brand {
    margin-left: 70px;
    margin-right: 145.5px;
    flex: 1;
    font-family: 'Roboto Italic ', sans-serif;
    background-image: url(./logo.png);
    background-repeat: no-repeat;

    background-position: center center;
    width: 157px;
    height: 44px;
}

.search_frame {
    /*    align-items: center;*/
    /*    padding-left: px;*/
    font-size: 20px;
    font-family: 'Roboto Italic ', sans-serif;
    font-style: italic;
    font-weight: 400;
    border-bottom: solid 1px #D7D7D7;
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    box-shadow: none;
    color: #fff;
}

.search_frame:focus {
    color: #fff;
    /*    border-bottom: solid 5px #D7D7D7;*/
    /*    background-color: aliceblue;*/
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    /*    border-width: 0px;*/
    outline: none;
}



/* @media screen and (max-width: 960px) {
  .logo-brand {
  min-width:187px;
  }
  .bg-purple{
    justify-content:center !important;
  }
} */
</style>
