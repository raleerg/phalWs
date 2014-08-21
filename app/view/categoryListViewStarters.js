/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('MyListItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Button'],
    xtype: 'mylistitem',
    config: {
        nameButton: true,
        dataMap: {
            getNameButton: {
                setText: 'name'
            }
        }
    },
    applyNameButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getNameButton());
    },
    updateNameButton: function(newNameButton, oldNameButton) {
        if (oldNameButton) {
            this.remove(oldNameButton);
        }

        if (newNameButton) {
            this.add(newNameButton);
        }
    }
});


Ext.define("IpadApp.view.categoryListViewStarters", {
    extend: "Ext.dataview.List",
    alias: "widget.categoryListViewStarters",
    initialize: function() {
        this.callParent(arguments);
        var categoriesList = Ext.getStore("menuStore").load();
        //this.getDataFromServer();

        var backbtn = {
            xtype: "button",
            text: 'Back',
            ui: 'action',
            handler: this.onBackBtnTapCategoryList,
            scope: this,
            cls: "top-back-btn"
        };

        var cartbtn = {
            xtype: "button",
            text: '',
            html: '<div class="cartInfo toolbar-cart"><span class="simpleCart_quantity"></span> MY ORDER</div>',
            ui: 'action',
            scope: this,
            cls: "top-cart-btn"
        };
        var addbtn = {
            xtype: "button",
            text: '',
            ui: 'action',
            handler: this.onAddBtnTap,
            scope: this,
            cls: "add-cart-btn"
        };
        var likebtn = {
            xtype: "button",
            text: '',
            ui: 'action',
            handler: this.onLikeBtnTap,
            scope: this,
            cls: "like-btn"
        };
        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            items: [
                backbtn,
                {xtype: 'spacer'},
                cartbtn
            ],
            cls: "green-toolbar"
        };
        
        /*
         * Take data for dataview
         */
        
        var data = {
            items: [
            {
                text: 'Starter 1',
                content: 'Tomato sauce, Italian mozzarella, beef ham or turkey ham, mushrooms, black olives and artichoke',
                images: 'pizza-detail-image.jpg',
                tumb: 'tumb1_70.jpg',
                price: '20',
                leaf: true
            },
            {
                text: 'Starter 2',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '35',
                leaf: true
            },
            {
                text: 'Starter 3',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '21',
                leaf: true
            },
            {
                text: 'Starter 4',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '45',
                leaf: true
            },
            {
                text: 'Starter 5',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '40',
                leaf: true
            }
        ]
        };
        
        Ext.define('ListItem', {
            extend: 'Ext.data.Model',
            config: {
                fields: [{
                    name: 'text',
                    type: 'string'
                },
                {
                    name: 'content',
                    type: 'string'
                },
                {
                    name: 'images',
                    type: 'string'
                },
                {
                    name: 'tumb',
                    type: 'string'
                },
                {
                    name: 'price',
                    type: 'string'
                },]
            }
        });
        //var store = this.getDataFromSubStore();
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'ListItem',
            defaultRootProperty: 'items',
            root: data
        });
        
        /*
         * Data listing box
         */
        var dataViewBox = Ext.create('Ext.NestedList', {
            xtype: 'nestedlist',
            title: 'Back',
            iconCls: 'star',
            cls: 'blog-box',
        	toolbar: {hidden:true},
        	id: 'main-list',
            displayField: 'text',
            getItemTextTpl: function(node) {
                return '<span class="list-tmpl {cls}" data-sub="{subcat}" data-filters="{tags}" ><img class="list-tmpl-img" src="resources/images/tumb1_70.jpg" alt="alternative_text"><span class="list-tmpl-text">{text}</span><div class="like-btn like-btn-top"><span id="like-{id}">{likeValue}</span></div><div class="simpleCart_shelfItem"><img class="item_thumb" style="width: 70px !important;" src="resources/images/{tumb}" alt="alternative_text"><h2 class="item_name"> {text} </h2><input type="text" value="1" class="item_Quantity"><span class="item_price">AED {price}</span><a id="test-btn" class="item_add" href="javascript:;"></a></div><div class="price-box">AED {price}</div></span>';
              },
            style: {margin: '10px'},
            items: {
                xtype: 'toolbar',
                title: 'filters',
                dock: 'bottom',
                cls: 'filter-toolbar',
            },
            store: store,
            /*detailCard: {
                xtype: 'panel',
                scrollable: true,
                styleHtmlContent: true,
                items: [addbtn, likebtn]
            },*/
            detailCard: {
                xtype: 'panel',
                scrollable: true,
                styleHtmlContent: true,
                items: [],
                html: 'You are viewing the detail card!'
            },
            listeners: {
                leafitemtap: function(nestedList, list, index, target, record) {
                    var detailCard = nestedList.getDetailCard();
                    if(record.get('images')){
                        var img = '<img src="resources/images/'+record.get('images')+'" />';
                    }else{
                        var img = '';
                    }
                    var genButton = '<div class="simpleCart_shelfItem"><img class="item_thumb" style="width: 70px !important;" src="resources/images/'+record.get('tumb')+'" alt="alternative_text"><h2 class="item_name"> '+record.get('text')+' </h2><input type="text" value="1" class="item_Quantity"><span class="item_price">AED '+record.get('price')+'</span><a class="item_add" href="javascript:;"></a></div>';
                    
                    detailCard.setHtml('<div class="detail-card-content"><div class="detail-price-box">AED '+record.get('price')+'</div><div class="like-btn like-btn-top absolute-likebtn" onclick="likeOnHtmlElement('+record.get('id')+');"><span id="dlike-'+record.get('id')+'">'+dbLib.getLike(record.get('id'))+'</span></div>'+ genButton +'<h1>' + record.get('text') + '</h1>' + '<p>' + record.get('content') + '</p>'+ img +'</div>' );
                },
                load : function() {
                    console.log(simpleCart.quantity());
                    $('.simpleCart_quantity').html('<span class="simpleCart_quantity">'+simpleCart.quantity()+'</span>');
                }
            }
        });

        /*
         * Main panel - everything going inside
         */
        var touchTeam = Ext.create('Ext.Container', {
            xtype: "panel",
            fullscreen: true,
            items: [topToolbar, dataViewBox,
                {
                    docked: 'left',
                    xtype: 'container',
                    layout: 'vbox',
                    width: '269px',
                    cls: 'carousel-bg',
                    defaults: {
                        flex: 1
                    },
                    items: [{
                            xtype: 'carousel',
                            flex: 1,
                            cls: 'carousel-top',
                            style: 'margin-left: 10px; margin-top: 10px;',
                            items: [
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> CHEF RECOMANDATIONS <span class="arrows-big-right"></span></h1><h2>PIZZA LOVERS</h2><p>Wood oven baked pizza and taste like a really Italy!</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc',
                                },
                                {
                                    html: '<div class="slide-box-1"><h1><span class="arrows-big-left"></span> CHEF RECOMANDATIONS <span class="arrows-big-right"></span></h1><h2>PIZZA LOVERS</h2><p>Wood oven baked pizza and taste like a really Italy!</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #66a7bc'
                                }
                            ]
                        },
                        {
                            xtype: 'carousel',
                            flex: 1,
                            cls: 'carousel-bottom',
                            style: 'margin-left: 10px; margin-top: 10px; margin-bottom: 10px;',
                            items: [
                                {
                                    html: '<div class="slide-box-2"><h1><span class="arrows-big-left"></span> SPECIALS <span class="arrows-big-right"></span></h1><h2>2 HOUSE BURGERS FOR PRICE OF ONE!</h2><p>Get 2 delicious house burgers and french fries for price of one for only</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #cd403c'
                                },
                                {
                                    html: '<div class="slide-box-2"><h1><span class="arrows-big-left"></span> SPECIALS <span class="arrows-big-right"></span></h1><h2>2 HOUSE BURGERS FOR PRICE OF ONE!</h2><p>Get 2 delicious house burgers and french fries for price of one for only</p><img src="resources/images/preporuka-kuvara.png" /></div>',
                                    cls: 'card',
                                    style: 'background-color: #cd403c'
                                }
                            ]
                        }],
                    style: {
                        background: '#d1d1d1'
                    }
                }],
            style: {background: '#000'},
            useComponents: true,
        });

        this.add([touchTeam]);
    },
    onCartBtnTap: function(){
        this.fireEvent("onCartBtnTap", this, 2);
    },
    onBackBtnTapCategoryList: function() {
        this.fireEvent("onBackBtnTapCategoryList", this);
    },
    getDataFromServer: function(){
        $.getJSON("http://hoppitality.hopperlink.com/web/api?action=getTagItems&company_id=1&tag=hot", function(data) {
            console.log(data);
            /*$.each(data, function(key, val) {
                items.push("<li id='" + key + "'>" + val + "</li>");
            });
            $("<ul/>", {
                "class": "my-new-list",
                html: items.join("")
            }).appendTo("body");*/
        });
    },
    getDataFromSubStore: function(){
        return Ext.getStore("subStore").load();
    }
            

});

