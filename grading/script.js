function _elementExists(selector) {
    return $(selector).length > 0;
}

function _urlIncludes(str) {
    const url = window.location.pathname;
    return url.includes(str)
}

function isHomePage() {
    return _urlIncludes('/home')
}

function isGraderPage() {
    return _urlIncludes('/grader')
}

function isRegisterPage() {
    return _urlIncludes('/register')
}

function isOverviewGradesPage() {
    return _urlIncludes('/overviewGrades')
}

function isCoordinatorExportPage() {
    return _urlIncludes('/coordinatorExport')
}

function isAdminPage() {
    return _urlIncludes('/manlyAdmins')
}

function isCoordinatorPage() {
    return _urlIncludes('/coordinator')
}

function isFeedbackLoginPage() {
    return window.location.toString().includes('feedback.mvp.international/login') || _urlIncludes('feedback_login')
}

function isFeedbackListPage() {
    return window.location.toString().includes('feedback.mvp.international/feedback/list') || _urlIncludes('feedback_list') || window.location.toString().includes('feedback.mvp.international/feedback/loginList')
}

function isFeedbackFormPage() {
    return window.location.toString().includes('feedback.mvp.international/feedback/feedback?team_id') || _urlIncludes('feedback_form')
}

function isMasterCoordinatorPage() {
    return [
        'https://football.mvp.international/masterCoordinator/',
        'https://football.mvp.international/masterCoordinator',
        'https://football2.mvp.international/masterCoordinator/',
        'https://football2.mvp.international/masterCoordinator',
    ].includes(window.location.toString())

}

function isMasterCoordinatorCheckinPage() {

    return [
        'https://football.mvp.international/masterCoordinator/checkIn',
        'https://football.mvp.international/masterCoordinator/checkIn/',
        'https://football2.mvp.international/masterCoordinator/checkIn',
        'https://football2.mvp.international/masterCoordinator/checkIn/',
    ].includes(window.location.toString())
}

function tableElementExists() {
    return _elementExists('table') || _elementExists('td') || _elementExists('tr');
}

function _elementContainsText(selector, text) {
    const _text = $(selector).text()
    return _text && _text.toLowerCase().includes(text.toLowerCase())
}

function _ifElementContainsText(selector, text, callback) {
    const _text = $(selector).text()
    if (_text && _text.toLowerCase().includes(text.toLowerCase())) {
        callback()
    }
}

function _ifElementExists(selector, callback) {
    if ($(selector).length > 0) {
        callback()
    }
}

function _ifElementDoesNotExist(selector, callback) {
    if ($(selector).length < 1) {
        callback()
    }
}

function _ifElementHasChild(parentElement, childSelector, callback) {
    if ($(parentElement).find(childSelector).length > 0) {
        callback();
    }
}

function _ifElementHasNoChild(parentElement, childSelector, callback) {
    if ($(parentElement).find(childSelector).length < 1) {
        callback();
    }
}

function initMutationObserver() {

    const observer = new MutationObserver((mutations) => {

        for (let index = 0; index < mutations.length; index++) {
            const mutation = mutations[index];
            const target = mutation.target;
            const id = target.id;

            if (id == 'content') {
                console.log('#content updated!')

                if (isHomePage() || isRegisterPage()) {

                    if (tableElementExists()) {

                        _ifElementExists('table#playerTable', () => {
                            $('#content').addClass('table-container')
                        })

                    } else {

                        $('#content').removeClass('table-container')

                        // Handle new player registration form
                        _ifElementExists('form#newPlayer', () => {
                            $('body').attr('id', 'register')
                            prependRegistrationForm()
                        })

                        _ifElementDoesNotExist('form#newPlayer', () => {
                            $('body').attr('id', 'home')
                        })


                        // Handle player lookup form
                        _ifElementExists('form#playerLookup', () => {
                            prependPlayerLookupForm()
                        })

                        // Handle new player registration success message
                        _ifElementContainsText('#content', 'Successfully registered', () => {
                            prependRegisterSuccess();
                        })

                    }

                } else if (isCoordinatorPage()) {

                    if (tableElementExists()) {

                        $('#content').addClass('table-container')

                    } else {

                        // Handle age group form
                        _ifElementExists('form#registerGrader', () => {
                            prependAgeGroupForm(false)
                        })

                        $('#content').removeClass('table-container')

                    }

                } else if (isGraderPage()) {

                    // if (tableElementExists()) {

                    //     $('#content').addClass('table-container')

                    // } else {

                    //     $('#content').removeClass('table-container')

                    //     // Handle  grader registration form
                    //     _ifElementExists('form#registerGrader', () => {
                    //         prependGraderRegistrationForm()
                    //     })

                    // }

                } else if (isMasterCoordinatorPage()) {

                    _ifElementExists('form#registerGrader', () => {
                        prependAgeGroupForm(true)
                    })

                } else if (isMasterCoordinatorCheckinPage()) {
                    if (tableElementExists()) {
                        $('#content').addClass('table-container')
                    } else {
                        $('#content').removeClass('table-container')
                    }
                }
            }

            if (isFeedbackFormPage()) {
                console.log('Feedback form updated!')
                $('grammarly-extension').remove()
            }

        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

}

document.addEventListener("DOMContentLoaded", function () {

    if (isCoordinatorExportPage()) {
        document.body.id = "coordinator-export"
    } else {
        $(document).ready(function () {
            initBodyClasses();
            initMutationObserver();
        })
    }

});

function initBodyClasses() {

    // function addBodyId(idStr) {
    //     $('body').attr('id', idStr)
    // }

    function addBodyId(idStr) {
        document.body.id = idStr;
    }

    if (isHomePage()) {
        addBodyId('home');
        modifyHomePage();
    } else if (isRegisterPage()) {
        addBodyId('register');
        modifyRegisterPage();
    } else if (isOverviewGradesPage()) {
        addBodyId('overview-grades');
    } else if (isCoordinatorPage()) {
        addBodyId('coordinator');
        modifyCoordinatorPage();
    } else if (isGraderPage()) {
        addBodyId('grader');
    } else if (isAdminPage()) {
        addBodyId('admin');
    } else if (isFeedbackLoginPage()) {
        addBodyId('feedback-login');
        modifyFeedbackLoginPage();
    } else if (isFeedbackFormPage()) {
        addBodyId('feedback-form');
        modifyFeedbackFormPage();
    } else if (isFeedbackListPage()) {
        addBodyId('feedback-list');
        modifyFeedbackListPage();
    } else if (isMasterCoordinatorPage()) {
        addBodyId('master-coordinator');
        modifyMasterCoordinatorPage();
    } else if (isMasterCoordinatorCheckinPage()) {
        addBodyId('master-coordinator-checkin');
        modifyMasterCoordinatorCheckinPage();
    }
}

function _appendIfElementDoesNotExist(selector, htmlStr) {
    _ifElementExists(selector, () => {
        console.log(`${selector} element already exists.`)
    })

    _ifElementDoesNotExist(selector, () => {
        $('body').append(htmlStr)
    })
}

function _prependIfElementDoesNotExist(selector, htmlStr) {
    _ifElementExists(selector, () => {
        console.log(`${selector} element already exists.`)
    })

    _ifElementDoesNotExist(selector, () => {
        $('body').prepend(htmlStr)
    })
}

function appendFooter() {
    _appendIfElementDoesNotExist('#footer', `
        <div id="footer">
            <div>
                Manly Vale Football Club is a registered non-profit organisation run by volunteers for our community.
            </div>

            <div>
                Our club acknowledges that we play on the land of the Gayemagal and Garigal people. We wish to pay respect
                to all Elders – past, present and future.
            </div>

            <div>
                © Manly Vale Football Club 2026
            </div>
        </div>
   `)
}

function prependMvfcLogo() {
    _prependIfElementDoesNotExist('.mvfc-logo', `
        <div class="logo-container">
            <a href="/">
                <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    `)
}

function prependRegistrationForm() {
    $('#content').remove()
    _prependIfElementDoesNotExist('#content', `<div id="content">
    <div class="left">
        <div class="logo-container">
            <a href="/">
                <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    </div>
    <div class="right">
        <form id="newPlayer" method="POST" action="">
            <div class="form-card">
                <h1 class="form-title">New Player Registration</h1>

                <div class="form-group">
                    <label for="valName">Player Name*</label>
                    <input type="text" name="valName" id="valName" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="valParentName">Guardian Name*</label>
                    <input type="text" name="valParentName" id="valParentName" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="telMobile">Mobile*</label>
                    <input type="text" name="telMobile" id="telMobile" maxlength="30">
                </div>

                <div class="form-group">
                    <label for="emlEmail">Email</label>
                    <input type="text" name="emlEmail" id="emlEmail" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="group_id">Select Group</label>
                    <select name="group_id" id="group_id">
                        <option value="0" selected="selected"></option>
                        <option value="6">Female U9s</option>
                        <option value="7">Mixed U9s</option>
                        <option value="8">Female U10s</option>
                        <option value="9">Mixed U10s</option>
                        <option value="10">Female U11s</option>
                        <option value="11">Mixed U11s</option>
                        <option value="12">Female U12s</option>
                        <option value="13">Mixed U12s</option>
                        <option value="14">Female U13s</option>
                        <option value="15">Mixed U13s</option>
                        <option value="16">Female U14s</option>
                        <option value="17">Mixed U14s</option>
                        <option value="18">Female U15s</option>
                        <option value="19">Mixed U15s</option>
                        <option value="20">Mixed U16s</option>
                        <option value="21">Female U18s</option>
                        <option value="22">Mixed U18s</option>
                        <option value="23">Mixed U21s</option>
                        <option value="24">Female U99s</option>
                        <option value="25">Mixed U99s</option>
                        <option value="26">Mixed U100s</option>
                    </select>
                </div>

                <div class="form-group">
                    <a onclick="saveNewPlayer()" class="btn custom-btn">Register New Player</a>
                </div>
            </div>
        </form>
    </div>
</div>
`)
}

function prependAgeGroupForm(isMasterCoordinator = false) {

    var link = isMasterCoordinator ? '/masterCoordinator' : '/coordinator';
    var title = isMasterCoordinator ? 'Master Coordinator' : 'Coordinator';

    $('#content').remove()
    _prependIfElementDoesNotExist('#content', `<div id="content" class="select-age-group">
    <div class="left">
        <div class="logo-container">
            <a href="${link}">
                <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    </div>
    <div class="right">
        <form id="registerGrader" method="POST" action="">
            <div class="form-card">
                <h1 class="form-title">Welcome ${title}</h1>

                <div class="form-group">
                    <label for="valAgeGroup">Select Age Group</label>
                    <select name="valAgeGroup" id="valAgeGroup">
                        <option value="0"></option>
                        <option value="9">U9s</option>
                        <option value="10">U10s</option>
                        <option value="11">U11s</option>
                        <option value="12">U12s</option>
                        <option value="13">U13s</option>
                        <option value="14-16">U14-16s</option>
                        <option value="18">U18s</option>
                        <option value="21">U21s</option>
                        <option value="99">U99s</option>
                        <option value="100">U100s</option>
                    </select>
                </div>

                <div class="form-group">
                    <a onclick="saveNewGradingGroup()" class="btn custom-btn">Start</a>
                </div>

            </div>
        </form>
    </div>
</div>
`)
}

function prependPlayerLookupForm() {
    $('#content').remove()

    var yearRange = 100
    var yearOptions = ``

    for (let i = 0; i < yearRange; i++) {
        const year = (new Date().getFullYear()) - i;
        yearOptions += `<option value="${year}">${year}</option>`
    }

    _prependIfElementDoesNotExist('#content', `
        <div id="content" class="player-lookup">
            <div class="left">
                <div class="logo-container">
                    <a href="/">
                        <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                    </a>

                    <h3>
                        Celebrating <strong>75 years</strong> of football with our community
                    </h3>
                </div>
            </div>
            <div class="right">
                <form id="playerLookup" method="POST" action="">
                    <div class="form-card">
                        <h1 class="form-title">Check In</h1>

                        <div class="form-group">
                            <label>Surname</label>
                            <input type="text" name="valName" id="valLastName" value="" maxlength="255">
                        </div>

                        <div class="form-group">
                            <label for="intYr">Select Birth Year</label>
                            <select name="intYr" id="intYr">
                                <option value="0"></option>
                                ${yearOptions}
                                <option value="0">0</option>
                                <option value="-1">-1</option>
                            </select>
                        </div>            

                        <div class="form-group">
                            <a onclick="getPlayers()" class="btn custom-btn">Look Up</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
`)
}

function prependRegisterSuccess() {
    $('#content').remove()
    _prependIfElementDoesNotExist('#content', `
        <div id="content">
            <div class="register-success">
                <div class="logo-container">
                    <a href="/">
                        <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                    </a>
                </div>
                Successfully registered, please check in with a Coordinator.<br>Let them know player name and group.
            </div>
        </div>
    `)
}

function modifyHomePage() {

    $('#content').remove()
    $('body>a').remove()

    $('body').prepend(`
        <div id="content">
            <div class="logo-container">
                <a href="/">
                    <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                </a>

                <h3>
                    Celebrating <strong>75 years</strong> of football with our community
                </h3>
            </div>

            <div class="actions">
                <a onclick="playerLookupCheckIn()" class="btn custom-btn">Check In</a>
                <a onclick="registerNewPlayer()" class="btn custom-btn">Register</a>
            </div>

        </div>
    `)

    appendFooter();
}

function modifyRegisterPage() {
    prependRegistrationForm();
    appendFooter();
}

function modifyCoordinatorPage() {

    if (!tableElementExists()) {

        $('#content').remove()
        $('body>a').remove()

        $('body').prepend(`
            <div id="content">

                <div class="logo-container">
                    <a href="/coordinator">
                        <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                    </a>
                    <h3>
                        Welcome Coordinator
                    </h3>
                </div>

                <div class="actions">
                    <a onclick="getNewGradingGroup()" class="btn custom-btn">New Group</a>
                </div>

            </div>
        `)

    } else {
        $('#content').addClass('table-container')
    }

    appendFooter();
}

function prependGraderRegistrationForm() {

    $('#content').remove()
    _prependIfElementDoesNotExist('#content', `
    <div id="content" class="grader-registration">

        <div class="left">
            <div class="logo-container">

                <a href="/grader">
                    <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                </a>

                <h3>
                    Celebrating <strong>75 years</strong> of football with our community
                </h3>

            </div>
        </div>

        <div class="right">
            <form id="registerGrader" method="POST" action="">
                <div class="form-card">

                    <h1 class="form-title">Grader Registration</h1>
                    
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="valName" id="valName" value="" maxlength="255">
                    </div>
                    
                    <div class="form-group">
                        <label>Mobile</label>
                        <input type="text" name="valMobile" id="valMobile" value="" maxlength="255">
                    </div>

                    <div class="form-group">
                        <label for="valAgeGroup">Select Age Group</label>
                        <select name="valAgeGroup" id="valAgeGroup">
                            <option value="0"></option>
                            <option value="9">U9s</option>
                            <option value="10">U10s</option>
                            <option value="11">U11s</option>
                            <option value="12">U12s</option>
                            <option value="13">U13s</option>
                            <option value="14-16">U14-16s</option>
                            <option value="18">U18s</option>
                            <option value="21">U21s</option>
                            <option value="99">U99s</option>
                            <option value="100">U100s</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <a onclick="registerGrader()" class="btn custom-btn">Start Grading</a>
                    </div>

                </div>
            </form>
        </div>

    </div>
`)
}

function modifyFeedbackLoginPage() {

    $('body>a:nth-of-type(1)').remove()

    var error = ''

    _ifElementContainsText('#content h3', 'Error: No teams found connected to this email', () => {
        error = `<h3 class="form-error">Error: No teams found connected to this email</h3>`
        $('body').addClass('has-error')
    })

    function prependFeedbackLoginForm() {
        $('#content').remove()
        _prependIfElementDoesNotExist('#content', `<div id="content">
        <div class="left">
            <div class="logo-container">
                <a href="/">
                    <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                </a>
    
                <h3>
                    Celebrating <strong>75 years</strong> of football with our community
                </h3>
            </div>
        </div>
        <div class="right">
            <form id="feedbackForm" method="POST" action="">
                <div class="form-card">
                    <h1 class="form-title">Login</h1>

                    ${error}
    
                    <div class="form-group">
                        <input type="text" name="emlEmail">
                    </div>
    
                    <div class="form-group">
                        <input class="btn" type="submit" value="login" style="text-transform:capitalize; width:100%;">
                    </div>

                </div>
            </form>
        </div>
    </div>
    `)
    }

    prependFeedbackLoginForm()
    appendFooter()
}

function modifyFeedbackFormPage() {

    $('body>a:nth-of-type(1)').remove()
    $('body #content>a').addClass('btn')

    prependMvfcLogo()
}

function modifyFeedbackListPage() {

    $('body>a:nth-of-type(1)').remove()
    $('body #content>a:first-child').each(function () {
        if ($(this).text().toLowerCase() == 'logout') {
            $(this).addClass('btn')
        }
    })

    prependMvfcLogo()
}

function modifyMasterCoordinatorPage() {

    $('#content').remove()
    $('body>a').remove()

    $('body').prepend(`
        <div id="content">

            <div class="logo-container">
                <a href="/masterCoordinator">
                    <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                </a>
                <h3>
                    Welcome Master Coordinator
                </h3>
            </div>

            <div class="actions">
                <a onclick="getNewGradingGroup()" class="btn custom-btn">New Group</a>
            </div>

        </div>
    `)

    appendFooter();
}

function modifyMasterCoordinatorCheckinPage() {

    $('#content').addClass('table-container')
    appendFooter();
}