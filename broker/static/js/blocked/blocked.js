const blocked = (function(){

    let initialized = false;

    const EMAIL_REGEXP = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const defaultParams = {
        lang: 'en_US',
        otherText: 'Other',
        showTWL: false,
        timeRemaining: 0,
        ctaSectionToShow: '',
        categories: '',
        keyword: '',
        reasonDescription: '',
        policyName: '',
        ou: '',
        safeSecGroupName: '',
        ssu: '',
        userEmail: '',
        fid: '',
        i2n: '',
        dateTime: '',
        ip: '',
        ua: '',
        filteringMethod: '',
        esPreference: '',
        url: '',
        registeredDomains: [],
        isRedirectToAnotherPage: "false",
        redirectTimeoutInMillisec: 0,
        redirectUrl: ''
    };

    const init = function(params){
        if (typeof params != "object") {
            return false;
        }
        params = Object.assign({}, defaultParams, params);
        // Handle redirection if enabled
        if (params.isRedirectToAnotherPage == "true") {
            if (document.getElementById('show-more')) {
                document.getElementById('show-more').click();
            }
            const overlay = document.getElementById("overlay");
            if (overlay) {
                overlay.style.display = "block";
            }
            setTimeout(function() {
                location.href = params.redirectUrl;
            }, params.redirectTimeoutInMillisec);
        }

        // set xsrf token for all ajax requests
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        if (xsrfToken) {
            $.ajaxSetup({
                headers: {
                    'X-XSRF-TOKEN': xsrfToken
                }
            });
        }

        $('#show-more').on('click', function (e) {
            e.preventDefault();
            $('.details').show();
            $('.more-details').slideDown();
            $('#show-less').show();
            $(this).hide();
            $(this).attr('aria-expanded', 'true');
            document.getElementById('aria-kb-link-tag').focus();
        });
    
        $('#show-less').on('click', function (e) {
            e.preventDefault();
            $('.more-details').slideUp();
            $('.details').hide();
            $('#show-more').show();
            $('#show-more').css('display', 'inline-block');
            $(this).hide();
            $(this).attr('aria-expanded', 'false');
            document.getElementById('show-more').focus();
        });

        if (typeof params.ctaSectionToShow != "undefined") {
            if (params.ctaSectionToShow != "" && $('#' + params.ctaSectionToShow).length) {
                $('#' + params.ctaSectionToShow).show();
            }
    
            if (params.ctaSectionToShow == "txtPageScan") {
                $("#askForPageScan").show();
                $("#askForPermissionLink").hide();
                $("#askForPermission").hide();
            }
            else if (params.ctaSectionToShow == "txtLoginAdmin" || params.ctaSectionToShow == "txtLoginTWL") {
                $("#askForPermission").hide();
                $("#askForPermissionLink").show();
            }
            else {
                if (params.ctaSectionToShow == "txtLogin") {
                    $("#askForPermission").hide();
                }
                $("#askForPermissionLink").hide();
            }
        }
    
        $('.askForPermissionClk').click(function() {
            if (($('.ask-btn').attr('aria-expanded')) == 'true') {
                $('.ask-btn').attr('aria-expanded', 'false');
            } else {
                $('.ask-btn').attr('aria-expanded', 'true');
            }
            $("#permissionForm").slideToggle('fast', function() {
                $(".navigation-button").toggleClass("ss-navigateup ss-navigatedown");
            });
        });
    
        $("#reasonDropdownMenu li").click(function(){
            $("#questionSelection").text($(this).text());
            $("#questionSelection").val($(this).text());
            updateReasonTextBox();
            formValidate();
            // Calling updateReasonTextBox function again for mac/ios related device
            // as weird issue coming, need to find some concrete solution for it
            // for now will keep this way
            if(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)){
                updateReasonTextBox();
            }
        });
    
        $('#teacherEmail').on('blur', function(){
            const inputEmail = $('#teacherEmail').val();
            const domain = inputEmail.substring(inputEmail.lastIndexOf("@") + 1);
            if(EMAIL_REGEXP.test(inputEmail) && params.registeredDomains.indexOf(domain.toLowerCase()) == -1) {
                $("#domainError").show();
                $("#sendEmail").attr("disabled", true);
            }
        });
    
        const otherReasonInfo = document.getElementById("otherReasonInfo");
        otherReasonInfo && otherReasonInfo.addEventListener("input",function(){
            formValidate();
        });
    
        const teacherEmail = document.getElementById("teacherEmail");
        teacherEmail && teacherEmail.addEventListener("input",function(){
            formValidate();
        });
    
        function updateReasonTextBox() {
            const questionSelectionValue = document.getElementById("questionSelection").value;
            const otherReasonElement =  document.getElementById("otherReasonInfo");
            if(questionSelectionValue == params.otherText){
                otherReasonElement.style.display= "block";
            } else {
                otherReasonElement.value = "";
                otherReasonElement.style.display= "none";
            }
        }
    
        function formValidate(){
            let disabled = false;
    
            const questionSelection = $("#questionSelection");
    
            if (questionSelection.length && questionSelection[0]) {
    
                // REASON SELECTION DROPDOWN VALIDATION
                const selectedReason = questionSelection[0].value;
                if (selectedReason != '') {
                    if (selectedReason == params.otherText) {
                        const otherReasonValue = otherReasonInfo.value;
                        if (otherReasonValue.length <= 500) {
                            disabled = false;
                        } else {
                            disabled = true;
                        }
                    } else {
                        disabled = false;
                    }
                }
            }
    
            if (params.showTWL) {
                // EMAIL VALIDATION
                $("#domainError").hide();
                if (teacherEmail) {
                    const inputEmail = teacherEmail.value;
                    if (EMAIL_REGEXP.test(inputEmail)) {
                        disabled = false;
                        const domain = inputEmail.substring(inputEmail.lastIndexOf("@") + 1);
                        if(params.registeredDomains.indexOf(domain.toLowerCase()) == -1) {
                            disabled = true;
                        }
                    } else {
                        disabled = true;
                    }
                } else {
                    disabled = true;
                }
            }
            if (disabled) {
                $("#sendEmail").attr("disabled", true);
            } else {
                $("#sendEmail").removeAttr("disabled");
            }
        }
    
        function startTimer(duration, display) {
            let timer = duration, minutes, seconds;
            const intervalId = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
    
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
    
                if (params.lang == 'es_ES') {
                    $(display).text(minutes + " minutos" + " " + seconds + " segundos");
                } else if (params.lang == 'fr_CA') {
                    $(display).text(minutes + " minutes" + " " + seconds + " secondes");
                } else {
                    $(display).text(minutes + " minutes" + " " + seconds + " seconds");
                }
    
                --timer;
    
                if (timer < 0) {
                    clearInterval(intervalId);
                    window.location.reload();
                }
            }, 1000);
        }
    
        if (params.timeRemaining && $('#banTime').length) {
            startTimer(params.timeRemaining, $('#banTime'));
        }
    
        $('#sendEmail').click(function(ev){
            // Disabled send button once clicked.
            $("#sendEmail").attr("disabled", true);
            const emailParams={};
            emailParams['site']= $('#permissionSite').val();
            emailParams['teacherEmail']= $('#teacherEmail').val();
            emailParams['reason']= $('#questionSelection').val();
            emailParams['otherReason']= $('#otherReasonInfo').val();
            emailParams['categories'] = params.categories;
            emailParams['keyword'] = params.keyword;
            emailParams['blockedReason'] = params.reasonDescription;
            emailParams['policy'] = params.policyName;
            emailParams['requesterOU'] = params.ou;
            emailParams['requesterSafeSecGroupName'] = params.safeSecGroupName;
            emailParams['requesterSSU'] = params.ssu;
            emailParams['requester'] = params.userEmail;
            emailParams['fid'] = params.fid;
            emailParams['i2n'] = params.i2n;
            emailParams['dateTime'] = params.dateTime;
            emailParams['externalIp'] = params.ip;
            emailParams['ua'] = params.ua;
            emailParams['filteringMethod'] = params.filteringMethod;
            emailParams['esPreference'] = params.esPreference;
            emailParams['url'] = params.url;

            if (params.showTWL) {
                sendEmail(emailParams, 'teacher');
            } else {
                sendEmail(emailParams, 'admin');
            }
            ev.preventDefault();
        });

        function sendEmail(obj, role){
            $.post("/broker/sendtwl",obj)
            .done(function( data ) {
                if (typeof data.status != undefined && data.status == false) {
                    resetFormDetails();
                    $("#sendEmail").attr("disabled", false);
                    $("#mailSuccess").hide();
                    $("#mailFailure").show();
                    return;
                }
                if (role == 'teacher') {
                    $("#sendEmail").attr("disabled", true);
                    $("#teacherEmail").attr("readonly", true);
                    $("#teacherEmail").attr("disabled", true);
                    $("#mailStatus").text(data.message);
                } else {
                    $("#sendEmailAdmin").attr("disabled", true);
                    $("#mailStatus").text(data.message);
                }
                $("#mailFailure").hide();
                $("#mailSuccess").show();
            })
            .fail(function(error){
                resetFormDetails();
                $("#sendEmail").attr("disabled", false);
                $("#mailSuccess").hide();
                $("#mailFailure").show();
            });
        }

        $('#sendPageScan').click(function(ev){
            $("#sendPageScanRequstedSubmitted").show();
            $("#sendPageScan").hide();
            $("#pageScanInfo").show();
            let params={};
            params['domain']= $('#psSite').val();
            params['requester'] = params.userEmail;
            $.get( "app/api/sendps",params)
            .done(function( data ) {})
            .fail(function (err) {});
        });

        function resetFormDetails(){
            if (document.getElementById('contactAdminForm')) {
                $("#contactAdminForm")[0].reset();
            }
        }

        // keyboard-only focus
        function handleFirstTab(e) {
            if (e.keyCode === 9) { // "I am a keyboard user" key
                $('body').addClass('user-is-tabbing');
                $(window).off('keydown');
                $(window).on('mousedown', handleMouseDownOnce);
            }
        }

        function handleMouseDownOnce() {
            $('body').removeClass('user-is-tabbing');
            $(window).off('mousedown', handleMouseDownOnce);
            $(window).on('keydown', handleFirstTab);
        }

        $(window).on('keydown', handleFirstTab);

        formValidate();

        return true;
    };

    const textAreaAdjust = function (element) {
        element.style.height = "1px";
        element.style.height = (25+element.scrollHeight)+"px";
    }

    return {
        init: function(params){
            if (!initialized) {
                initialized = init(params);
            }
            return initialized;
        },
        textAreaAdjust: textAreaAdjust
    }
})();