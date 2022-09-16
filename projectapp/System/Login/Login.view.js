sap.ui.jsview("projectapp.System.Login.Login", {
    getControllerName: function () {
        return "projectapp.System.Login.Login";
    },

    createContent: function (oController) {

        var scroll = new sap.m.ScrollContainer({
            height : "100%",
            width : "100%" ,
            vertical :true
        });
        var content = new sap.ui.core.HTML("", {
            content: `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" type="text/css" href="asset/css/cssLogin/bootstrap.min.css">
                    <link rel="stylesheet" type="text/css" href="asset/css/home.css">
                    <title>Welcome to FE Developer</title>
                </head>
                <body>
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-sm mr-5 ml-5 wc-text">
                                <h3>Welcome to</h3>
                                <h1 class="fe-text mt-1">FRONTEND</h1>
                                <h4>Syllabus</h4>
                                <button type="button" id="home" class="btn btn-primary">Let's Rock n roll</button>
                            </div>
                            <div class="col-sm ml-5">
                                <img src="asset/image/img1.png" alt="">
                            </div>
                        </div>
                    </div>
                </body>
                </html>`
        })
        
        content.attachAfterRendering(function () {
            $("#home").click(function () {
                SAPUI.Route("Home1")});
        })
        scroll.addContent(content);
        return scroll
    }
});