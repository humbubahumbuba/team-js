// *** AUTH MODULE (div into lesser functional chunks) *** //

import { isOnHomePage } from "./page-content-loader";

import { getStorageData, setStorageData, lskeys } from "./ls-data";
const { STORAGE_USERS, CRT_USER } = lskeys;


const refs = {
	signUpForm: document.querySelector('.form-signup'),
	signUpBtn: document.querySelector('.button--signup'),
	signInForm: document.querySelector('.form-signin'),
	signInBtn: document.querySelector('.button--signin'),

	// modal refs
	modalOpenBtns: document.querySelectorAll('[data-modal-open]'),
    modalCloseBtns: document.querySelectorAll('[data-modal-close]'),
    overlay: document.querySelector('.js-overlay-modal'),
};


// *** Auth modal windows *** //

// !!! remove fn wrapper when lib page contains auth modal windows !!!
// check if page is home page 
if (isOnHomePage()) {
	document.addEventListener('DOMContentLoaded', handleAuth);
}

// function wrapping to avoid errors on pages with no auth modals
function handleAuth() {
	// add listeners for modals open/close
	refs.modalOpenBtns.forEach(function (openBtn) {
		openBtn.addEventListener('click', openModal);
	});

	refs.modalCloseBtns.forEach(function (closeBtn) {
		closeBtn.addEventListener('click', closeModal);
	});


	// add functions for handling opening/closing
	function openModal(e) {
		// prevent default click handling if button is a link
		e.preventDefault();

		const modalId = this.getAttribute('data-modal-open');
		const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

		// hotfix for swapping auth forms
		if (e.target.dataset.modalOpen === "signup" ||
			e.target.dataset.modalOpen === "login") {
			closeModal.call(this);
		}

		modalElem.classList.add('active');
		refs.overlay.classList.add('active');
	}

	function closeModal(e) {
		const parentModal = this.closest('.modal');

		if (parentModal) {
			parentModal.classList.remove('active');
			refs.overlay.classList.remove('active');
		}
	}

	// close on hitting Escape button
	document.body.addEventListener('keyup', (e) => {
		if (e.key === 'Escape') {
			document.querySelector('.modal.active').classList.remove('active');
			document.querySelector('.overlay').classList.remove('active');
		}
	});

	refs.overlay.addEventListener('click', function () {
		document.querySelector('.modal.active').classList.remove('active');
		this.classList.remove('active');
	});



	// listeners moved from auth scripts 
	refs.signInBtn.addEventListener('click', onLoginClick);
	refs.signUpBtn.addEventListener('click', onSignUpClick);

};

//endof handleAuth


// *** //




// *** Auth forms code *** //

function onLoginClick(e) {
	e.preventDefault();
	
	const userLogin = refs.signInForm.elements["user-email"].value;
	const userPassword = refs.signInForm.elements["user-password"].value;
	
	loginUser({userLogin, userPassword});
}


function onSignUpClick(e) {
	e.preventDefault();
	
	const userLogin = refs.signUpForm.elements["user-email"].value;
	const userPassword = refs.signUpForm.elements["user-password"].value;
	const userName = refs.signUpForm.elements["username"].value;

	createUser({userLogin, userPassword, userName});
	loginUser({userLogin, userPassword});
}

// *** //



// *** Auth scripts *** //

// create user
// ADD VALIDATION!!!

function createUser(credentials) {
	const {userName, userLogin, userPassword} = credentials;

	let users = getStorageData(STORAGE_USERS);

	const userData = {
		userid: null,
		username: userName,
		login: userLogin,
		password: userPassword,
		queue: [],
		watched: [],
	}
	
	// check if any users
	if (!users) {
		userData.userid = 1;
		users = [userData];
		setStorageData(STORAGE_USERS, users);
		// add notification (instead of console.log) and autologin redirect
		alert("User created!");
		return;
	}
		
	// check if user already exists
	if (isExistingUser(userLogin)) {
		alert("There is already a user with this email!");
		return;
	}

	// default behaviour if all checks failed
	const userids = users.map(user => user["userid"]);
	userData.userid = Math.max(...userids) + 1;
	users.push(userData);
	setStorageData(STORAGE_USERS, users);
	// add notification and autologin redirect
	alert("User created!");
}


// login user

function loginUser(credentials) {
	const {userLogin, userPassword} = credentials;
	
	const users = getStorageData(STORAGE_USERS);

	if (!users) {
		alert("No users yet. Sign-up and become a user!");
		return;
	}

	if (isExistingUser(userLogin))  {
		// find existing user and check if passwords match
		const user = users.find(user => user.login === userLogin);

		// check if passwords match
		if (user.password === userPassword) {
			// check if already logged in
			if (user.userid === getStorageData(CRT_USER)) {
				alert("Already logged in!");
				return;
			}

			// set current user
			setStorageData(CRT_USER, user.userid);

			alert("Welcome!");
			// close login window after successful login
			document.querySelector('.modal.active').firstElementChild.click();
			return;
		} 
		
		alert("Password incorrect!");
	} else {
		alert("No user found with this email. Please check your login and password and try again.");
	}
}


// check existing user util

function isExistingUser(login) {
	const users = getStorageData(STORAGE_USERS);
	const logins = users.map(user => user["login"]);
	
	return (logins.includes(login));
}

// *** //
