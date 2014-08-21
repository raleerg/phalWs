/* 
 * Main Controller
 */
Ext.define("IpadApp.controller.menuController", {
    extend: "Ext.app.Controller",
    
    config: {
        refs: {
            loginView: "loginview",
            homeView: "homeView",
            categoriesView: "categoriesView",
            categoryListViewBeverages: "categoryListViewBeverages",
            categoryListViewStarters: "categoryListViewStarters",
            categoryListViewSpirits: "categoryListViewSpirits",
            cartView: "cartView",
            changeListDataOnBtn: "changeListDataOnBtn",
            searchView: "searchView",
            menu: "menu"
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
            homeView: {
                onMenuButtonTap: "onMenuButtonTap",
                onQuestButtonTap: "onQuestButtonTap"
            },
            categoriesView: {
                onBackBtnTap: "onBackBtnTap",
                onCategoryTap: "onCategoryTap",
                onCartBtnTap: "onCartBtnTap"
            },
            categoryListViewBeverages: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap",
                onFilterBtnTap: "onFilterBtnTap",
                onDataUpdateBtnTap: "onDataUpdateBtnTap",
                onRightSlideMenuTap: "onRightSlideMenuTap",
                onSearchButtonTap: "onSearchButtonTap"
            },
            categoryListViewStarters: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap"
            },
            categoryListViewSpirits: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap"
            },
            cartView: {
                onCloseBtnTap: "onCloseBtnTap"
            },
            searchView: {
            },
            menu: {
            }
            
        }
    },
    sessionToken: null,
    
    onSignInCommand: function (view, username, password) {
        
        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({
            url: 'http://hoppitality.hopperlink.com/web/api/',
            method: 'post',
            params: {
                action: "login", password: "123456", id: "1", email: "waiter1@hopperlink.com",
                //user: username,
                //pwd: password
                //action: "login", password: password, id: "1", email: username,
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success === "true") {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess();     //Just simulating success.
                } else {
                    me.signInFailure(loginResponse.message);
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },
    signInSuccess: function () {
        console.log('Signed in.');
        var loginView = this.getLoginView();
        mainMenuView = this.getMainMenuView();
        loginView.setMasked(false);
        
        this.activateHomeView();
    },
    signInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },
    loadMarkers: function() {
        //set up refs to the two stores
        var markerStore = Ext.getStore('markerStore');
        var markerStoreLocalStorage= Ext.getStore('markerStoreLocalStorage');
 
        //load the localStorage store
        markerStoreLocalStorage.load();
 
        // check if localStorage contains data
        if ((markerStoreLocalStorage.getCount()) == 0) {
            // nothing found so  we need to load the data from external source
            console.log('localStorage data not found');
            //hand off to onMarkerStoreLoad function (below)
            markerStore.on({
                load: 'onMarkerStoreLoad',
                scope: this
            });
            //call load to trigger above
            markerStore.load();
        } else {
            // we are ok, just print some debug
            console.log('localStorage data found');
            console.log('localStorage count:' + markerStoreLocalStorage.getCount());
        }
        //finally set the list's store to localStorage
        this.getListMarkersCard().setStore(markerStoreLocalStorage);
 
    },
    onMarkerStoreLoad: function() {
        //set up refs
        var markerStoreLocalStorage= Ext.getStore('markerStoreLocalStorage');
        var markerStore = Ext.getStore('markerStore');
        //loop through each data item and add to localStorage
        markerStore.each(function(item){
            markerStoreLocalStorage.add(item);
        });
        markerStoreLocalStorage.sync();
     },
    onFilterBtnTap: function(){
        
        /*
         * Select sencha element by id
         */
        
        var mylistitems = Ext.ComponentQuery.query("#nested-list-uii");
        var newData = Ext.getStore('menuStore');
        mylistitems.store.load();
    },
    onCartBtnTap: function() {
        window.globActPage = arguments[1];
        this.activateCartViewSlideTop();
    },
    onCloseBtnTap: function() {
        if(window.globActPage && window.globActPage === 1)
            this.activateCategoriesViewSlideRight();
        else
            this.activateCategoryListViewSlideCart();
    },
    onBackBtnTapCategoryList: function() {
        this.activateCategoriesViewSlideRight();
    },
    onBackBtnTap: function () {
        this.activateHomeView();
    },
    onMenuButtonTap: function () {
        simpleCart.load();
        this.activateCategoriesViewSlideLeft();
    },
    onRightSlideMenuTap: function(){
        this.activateLeftSlidingMenu();
    },
    onSearchButtonTap: function (){
        this.activateSearchView();
    },
    onCategoryTap: function(){
        var view = arguments[1];
        switch(view)
            {
            case 0:
                this.onDataUpdateBtnTap('BreakfastMenu');
                this.activateCategoryListViewBeverages();
              break;
            case 1:
              this.activateCategoryListViewStarters();
              break;
            case 2:
                this.onDataUpdateBtnTap('ChefsFavourites');
                this.activateCategoryListViewBeverages();
              
              break;
            case 3:
                this.onDataUpdateBtnTap('MainMenu');
                this.activateCategoryListViewBeverages();
              
              break;
            case 4:
                this.onDataUpdateBtnTap('Desserts');
                this.activateCategoryListViewBeverages();
              
              break;
            default:
                this.onDataUpdateBtnTap('BreakfastMenu');
                this.activateCategoryListViewBeverages();
            }
            
    },
    onDataUpdateBtnTap: function(data){
        var categorylistview = this.getCategoryListViewBeverages();
        switch(data)
            {
            case 'BreakfastMenu':
                window.store.getProxy().setExtraParam('extraParameter', 'BreakfastMenu' );
                window.store.load();
              break;
              case 'ChefsFavourites':
                window.store.getProxy().setExtraParam('extraParameter', 'ChefsFavourites' );
                window.store.load();
              break;
              case 'Desserts':
                window.store.getProxy().setExtraParam('extraParameter', 'Desserts' );
                window.store.load();
              break;
              case 'MainMenu':
                window.store.getProxy().setExtraParam('extraParameter', 'MainMenu' );
                window.store.load();
              break;
              case 'Salads':
                window.store.getProxy().setExtraParam('extraParameter', 'Salads' );
                window.store.load();
              break;
              case 'Sandwiches':
                window.store.getProxy().setExtraParam('extraParameter', 'Sandwiches' );
                window.store.load();
              break;
              case 'SnackMenu':
                window.store.getProxy().setExtraParam('extraParameter', 'SnackMenu' );
                window.store.load();
              break;
              case 'Specials':
                var storeExt = Ext.getStore('treeStore');
                window.store.getProxy().setExtraParam('extraParameter', 'specials' );
                window.store.load();
              break;
            }
        
        
        Ext.getCmp('nested-list-uii').onBackTap();
        
    },
            
    activateCartViewSlideTop: function(){
        var categorylistview = this.getCartView();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },      
    activateCategoryListViewSlideCart: function(){
        var categorylistview = this.getCategoryListViewBeverages();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideRightTransition);
    },    
    activateCategoryListViewBeverages: function(){
        var categorylistviewbeverages = this.getCategoryListViewBeverages();
        Ext.Viewport.animateActiveItem(categorylistviewbeverages, this.slideLeftTransition);
    },
    activateCategoryListViewStarters: function(){
        var categorylistview = this.getCategoryListViewStarters();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },
    activateCategoryListViewSpirits: function(){
        var categorylistview = this.getCategoryListViewSpirits();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },
    activateCategoriesViewSlideLeft: function () {
        var categoriesview = this.getCategoriesView();
        Ext.Viewport.animateActiveItem(categoriesview, this.slideLeftTransition);
    },
    activateCategoriesViewSlideRight: function () {
        var categoriesview = this.getCategoriesView();
        Ext.Viewport.animateActiveItem(categoriesview, this.slideRightTransition);
    },
    activateHomeView: function () {
        var homeview = this.getHomeView();
        Ext.Viewport.animateActiveItem(homeview, this.slideRightTransition);
    },
    activateLeftSlidingMenu: function(){
        var menuview = this.getMenu();
        var categoryList = Ext.get('ext-element-2');
        categoryList.addCls('viewport-inner');
        menuview.toggle();
    },
    activateSearchView: function() {
        var searchView = this.getSearchView();
        var categoryList = Ext.get('ext-element-2');
        categoryList.addCls('viewport-inner');
        searchView.toggle();
    },
            
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    slideTopTransition: { type: 'slide', direction: 'top' }
    
});

