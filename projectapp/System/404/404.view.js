sap.ui.jsview("projectapp.System.Maintenance.404", {

    /** Specifies the Controller belonging to this View. 
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf it_admin_entry.UX_MAIN.Maintenance
     */
    getControllerName: function() {
        return "projectapp.System.Maintenance.404";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
     * Since the Controller is given to this method, its event handlers can be attached right away. 
     * @memberOf it_admin_entry.UX_MAIN.Maintenance
     */
    createContent: function(oController) {
        window.localStorage.setItem("languageLS", "IN");

        var content = new sap.ui.core.HTML("", {
            content: `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- <title>HRD Web Apps</title> --!>
                <link rel="stylesheet" type="text/css" href="asset/css/cssLogin/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="asset/css/cssLogin/iofrm-style2.css">
            </head>
            <body>
                <div class="form-body" class="container">
                    <div class="row" style="height: 100vh !important;">
                        <div class="col-lg-12" style="background-image: url('asset/image/404.jpg'); background-repeat: no-repeat; background-size: 100% auto">
                            <div class="ghost bounce" style="display: flex;justify-content: center;margin-top: 20%;">
                                <img src="asset/image/Ghost_404.png" alt="" style="height: 10%; width: 10%;">
                            </div>
                            <div style="display: flex;justify-content: center; margin-top: 10%;">
                                <button id="back" type="submit" class="backBtn">Go Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `
        })

        content.attachAfterRendering(function () {
            $("#back").click(function () {
                oController.onbtnBack();
            });
        })

		return content;
	}

});