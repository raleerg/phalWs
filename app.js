/*
 * Main js
 * 
 * Code name: phalconWings
 * Repository name: phalWs
 */

Ext.application({
    name: "IpadApp",
    models: ["menuModel", "cartModel", "subModel", "testModel", "treeModel"],
    stores: ["menuStore", "cartStore", "subStore", "testStore", "treeStore"],
    controllers: ["menuController", "searchController"],
    views: ["Login", "categoryListViewBeverages", "categoryListViewStarters", "categoryListViewSpirits", "homeView", "categoriesView", "cartView", "searchView", "menu"],

        launch: function () {
            
            var logInView = { 
                xtype: 'loginview'
            };
            
            var homeView = {
                xtype: "homeView"
            };
            
            var categoriesView = {
                xtype: "categoriesView"
            };
            
            var categoryListViewBeverages = {
                xtype: "categoryListViewBeverages"
            };
            
            var categoryListViewStarters = {
                xtype: "categoryListViewStarters"
            };
            
            var categoryListViewSpirits = {
                xtype: "categoryListViewSpirits"
            };
            
            var cartView = {
                xtype: "cartView"
            };
            
            var searchView = {
                xtype: "searchView"  
            };
            
            var menu = {
                xtype: "menu"
            };

            Ext.Viewport.add(homeView, categoriesView, categoryListViewBeverages, categoryListViewStarters, categoryListViewSpirits, cartView, searchView, menu);
            
            //console.log('App is loaded! Second page.');
            
        }
});
