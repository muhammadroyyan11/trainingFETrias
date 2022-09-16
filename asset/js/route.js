sap.ui.getCore().attachInit(function () {
    sap.ui.localResources("projectapp");
    var app = new sap.m.App();

    var myroutes = [{
        pattern: "",
        name: "Login",
        view: "projectapp.System.Login.Login",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: "Home1",
        name: "Home1",
        view: "projectapp.System.Login.Home1",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: "Home2",
        name: "Home2",
        view: "projectapp.System.Login.Home2",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: "Trx1",
        name: "Trx1",
        view: "projectapp.System.Trx.Trx1",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: "Trx2",
        name: "Trx2",
        view: "projectapp.System.Trx.Trx2",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: "Trx3",
        name: "Trx3",
        view: "projectapp.System.Trx.Trx3",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: ["Dashboard"],
        name: "Dashboard",
        view: "projectapp.System.Dashboard.Dashboard",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: ["404"],
        name: "404",
        view: "projectapp.System.404.404",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
    {
        pattern: ["503"],
        name: "503",
        view: "projectapp.System.503.503",
        viewType: sap.ui.core.mvc.ViewType.JS,
        targetControl: "appId",
        clearTarget: true,
        callback: function () {
            myCallback(this);
        }
    },
];

    var myCallback = function ($this) {
        // 1. Get Current Route
        var currentRoute = Global.getCurrentRoute()
        var newRoute = $this.name
        var currentView
        var readyRedirect = true
        let tcodeSplit = newRoute.split("_")
        var tcode = newRoute.replace("_" + tcodeSplit[tcodeSplit.length - 1], "")

        // 1a. Mengecek apakah newRoute sama dengan currentRoute, jika sama berarti refresh (reload)
        if (currentRoute == newRoute && (currentRoute !== undefined && newRoute !== undefined)) {
            var viewId = "id" + $this.name;
            var view = sap.ui.getCore().byId(viewId);

            if (view != undefined) {
                view.destroy()
            }

            view = new sap.ui.view({
                id: viewId,
                viewName: $this.view,
                type: sap.ui.core.mvc.ViewType.JS
            });

            app.addPage(view);
            app.to(viewId);

            Global.IsFirstLogon()

        } else {
            // 2. Create View from Current Route
            if (currentRoute) {
                var objRoute = myroutes.find(route => {
                    return route["name"] === currentRoute
                })

                currentView = sap.ui.getCore().byId("id" + currentRoute)
                if (currentView == undefined) {
                    currentView = new sap.ui.view({
                        id: "id" + currentRoute,
                        viewName: objRoute["view"],
                        type: sap.ui.core.mvc.ViewType.JS
                    });
                }
            }

            // 2a. if current route != new route & these route is defined, run next step, if not skip to step 5
            if ((currentRoute !== newRoute) && (currentRoute && newRoute)) {
                // 3. Get Controller from Current View
                var currentCntlr = currentView.getController()

                // 4. Find if current controller have onRedirect function, if found, run it
                if (currentCntlr) {
                    if (typeof currentCntlr.onRedirect == 'function') {
                        readyRedirect = currentCntlr.onRedirect()
                    }
                }
            }
            var newViewId = "id" + $this.name
            var newView = sap.ui.getCore().byId(newViewId)
            const authorized = true //Global.GetAuthTcode(tcode)

            if(!authorized){
                if(!FORCEROUTE){
                    SAPUI.MessageBoxError("User don't have authorization to this page", function(){
                        SAPUI.Route("Dashboard")
                    })
                }
            }

            if (readyRedirect && (authorized || FORCEROUTE)) {
                FORCEROUTE = false
                // 5. Destroy Current View
                if (currentView) {
                    currentView.destroy()
                }

                // 7. Get the new view, find it, if found destroy it
                try {
                    if (newView !== undefined) {
                        newView.destroy()
                    }
                    
                } catch (error) {
                    console.error(error)
                } finally {

                }

                // 8. Create the new view
                newView = new sap.ui.view({
                    id: newViewId,
                    viewName: $this.view,
                    type: sap.ui.core.mvc.ViewType.JS
                });

                // 9. Add history
                Global.addHistory($this.name)

                // 10. Move to the new view
                app.addPage(newView);
                app.to(newViewId);

                if($this.name != "Login"){
                    Global.IsFirstLogon()
                    Global.InsLogActivity(newRoute, "")
                }

            } else {
                // 
                // app.to("id" + currentRoute);
                if (currentRoute) {
                    window.history.replaceState({}, '', "/#/" + currentRoute)
                }
            }
        }
    };

    var router = new sap.ui.core.routing.Router(myroutes);

    router.attachBypassed(function (oEvent) {
        router.navTo("404")
    })

    router.register("appRouter");
    router.initialize();
    app.placeAt("content");
})