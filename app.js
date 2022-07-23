/**
* ViewImage gzip compressed to just 2K, small and superb native Native JavaScript lightbox plugin
*
* @name ViewImage.js
* @version 2.0.0
* @author Tokinx
* @license MIT License - http://www.opensource.org/licenses/mit-license.php
*
* For usage and examples, visit:
* https://tokinx.github.io/ViewImage/
*
* Copyright (c) 2017, biji.io
*/
window.ViewImage=new function(){this.target="[view-image] img",this.listener=e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const t=String(this.target.split(",").map((e=>`${e.trim()}:not([no-view])`))),i=e.target.closest(t);if(!i)return;const a=[...(i.closest("[view-image]")||document.body).querySelectorAll(t)].map((e=>e.href||e.src));this.display(a,i.href||i.src),e.stopPropagation(),e.preventDefault()},this.init=e=>{e&&(this.target=e),["removeEventListener","addEventListener"].forEach((e=>{document[e]("click",this.listener,!1)}))},this.display=(e,t)=>{let i=e.indexOf(t);const a=(new DOMParser).parseFromString(`\n \t\t\t\t<div class="view-image">\n \t\t\t\t<style>.view-image{position:fixed;inset:0;z-index:5000;padding:3%;display:flex;flex-direction:column;animation:view-image-in 300ms;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}.view-image__out{animation:view-image-out 300ms}@keyframes view-image-in{0%{opacity:0}}@keyframes view-image-out{100%{opacity:0}}.view-image-btn{width:32px;height:32px;display:flex;justify-content:center;align-items:center;cursor:pointer;border-radius:3px;background-color:rgba(255,255,255,0.2)}.view-image-btn:hover{background-color:rgba(255,255,255,0.5)}.view-image-close__full{position:absolute;inset:0;background-color:rgba(48,55,66,0.3);z-index:unset;cursor:zoom-out;margin:0}.view-image-container{height:0;flex:1;display:flex;align-items:center;justify-content:center;padding-bottom:3%}.view-image-lead{display:contents}.view-image-lead img{position:relative;z-index:1;max-width:100%;max-height:100%;object-fit:contain;border-radius:3px}.view-image-lead__in img{animation:view-image-lead-in 300ms}.view-image-lead__out img{animation:view-image-lead-out 300ms forwards}@keyframes view-image-lead-in{0%{opacity:0;transform:translateY(-20px)}}@keyframes view-image-lead-out{100%{opacity:0;transform:translateY(20px)}}[class*=__out] ~ .view-image-loading{display:block}.view-image-loading{position:absolute;inset:50%;width:8rem;height:2rem;color:#aab2bd;overflow:hidden;text-align:center;margin:-1rem -4rem;z-index:1;display:none}.view-image-loading::after{content:"";position:absolute;inset:50% 0;width:100%;height:3px;background:rgba(255,255,255,0.5);transform:translateX(-100%) translateY(-50%);animation:view-image-loading 800ms -100ms ease-in-out infinite}@keyframes view-image-loading{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.view-image-tools{position:relative;display:flex;justify-content:space-between;align-content:center;color:#fff;max-width:600px;width:100%;margin:0 auto;padding:10px;border-radius:5px;background:rgb(20 20 20 / 35%);margin-bottom:constant(safe-area-inset-bottom);margin-bottom:env(safe-area-inset-bottom);z-index:1}.view-image-tools__count{width:60px;display:flex;align-items:center;justify-content:center}.view-image-tools__flip{display:flex;gap:10px}.view-image-tools [class*=-close]{margin:0 10px}</style>\n \t\t\t\t<div class="view-image-container">\n \t\t\t\t<div class="view-image-lead"></div>\n \t\t\t\t<div class="view-image-loading"></div>\n \t\t\t\t<div class="view-image-close view-image-close__full"></div>\n \t\t\t\t</div>\n \t\t\t\t<div class="view-image-tools">\n \t\t\t\t<div class="view-image-tools__count">\n \t\t\t\t<span><b class="view-image-index">${i+1}</b>/${e.length}</span>\n \t\t\t\t</div>\n \t\t\t\t<div class="view-image-tools__flip">\n \t\t\t\t<div class="view-image-btn view-image-tools__flip-prev">\n \t\t\t\t<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M31 36L19 24L31 12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n \t\t\t\t</div>\n \t\t\t\t<div class="view-image-btn view-image-tools__flip-next">\n \t\t\t\t<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M19 12L31 24L19 36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n \t\t\t\t</div>\n \t\t\t\t</div>\n \t\t\t\t<div class="view-image-btn view-image-close">\n \t\t\t\t<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M8 8L40 40" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n \t\t\t\t</div>\n \t\t\t\t</div>\n \t\t\t\t</div>\n \t\t\t\t`,"text/html").body.firstChild,n=function(e){const t={Escape:"close",ArrowLeft:"tools__flip-prev",ArrowRight:"tools__flip-next"};t[e.key]&&a.querySelector(`.view-image-${t[e.key]}`).click()},o=e=>{const t=new Image,i=a.querySelector(".view-image-lead");i.className="view-image-lead view-image-lead__out",setTimeout((()=>{i.innerHTML="",t.onload=function(){setTimeout((()=>{i.innerHTML=`<img src="${t.src}" alt="ViewImage" no-view/>`,i.className="view-image-lead view-image-lead__in"}),100)},t.src=e}),300)};document.body.appendChild(a),o(t),window.addEventListener("keydown",n),a.onclick=t=>{t.target.closest(".view-image-close")?(window.removeEventListener("keydown",n),a.onclick=null,a.classList.add("view-image__out"),setTimeout((()=>a.remove()),290)):t.target.closest(".view-image-tools__flip")&&(i=t.target.closest(".view-image-tools__flip-prev")?0===i?e.length-1:i-1:i===e.length-1?0:i+1,o(e[i]),a.querySelector(".view-image-index").innerHTML=i+1)}}};

/**
* 
* Main Script
* 
*/
['turbo:click', 'turbo:submit-start'].forEach(function(e) {
	window.addEventListener(e, function(){
		Turbo.navigator.delegate.adapter.showProgressBar();			
	});
});

document.addEventListener("turbo:load", function() {
	/* load script after turbolink loaded page */

	/* check if have mobile ?m=1 > redirect to ?m=0 (fix double request event turbo:load) */
	if (window.location.href.indexOf("?m=1") > -1) {
		window.location.href = window.location.href.replace("?m=1", "?m=0");
	}					

	/* get page_type */
	is_page = $("meta[name='is_page']").attr('content');			

	/* load script global */			
	mainNav(); /* load Nav */
	darkMode(); /* load darkMode */
	backToTop(); /* load back to top */			

	/* load script if on page multiple */
	if (is_page == 'multiple') {

		/* load carousel */
		carouselIndex();

		/* load postPaginationMultiple */
		let postIndex = $("#postPaginationMultiple"), postIndexHasLoaded = 0;
		if (postIndex.length > 0) {	

			/* first remove function prevent duplciate call */
			delete window.postPaginationMultiple;

			/* on load and */
			if(($(window).scrollTop() + $(window).height()) >= ($(document).height() - 200) && !postIndexHasLoaded) {

				/* set postIndexHasLoaded */
				postIndexHasLoaded = 1;

				postPaginationMultiple(function(){
					/* set postIndexHasLoaded */
					postIndexHasLoaded = 0;
				});							
			}

			/* on scroll */
			$(window).on("scroll", function() {
				if(($(window).scrollTop() + $(window).height()) >= ($(document).height() - 200) && !postIndexHasLoaded) {

					/* set postIndexHasLoaded */
					postIndexHasLoaded = 1;

					postPaginationMultiple(function(){
						/* set postIndexHasLoaded */
						postIndexHasLoaded = 0;
					});							
				}
			});		
		}

		/* Load adsMoveFeed */
		adsMoveFeed();		
	}

	if (is_page == 'single') {

		/* Call viewImage */
		window.ViewImage && ViewImage.init('.post-content img, .post-content a img');

		/* Load adsMovePost */
		adsMovePost();		

		/* load after scroll on post-detail */
		let postDetail = $(".post-detail"), postDetailHasLoaded = 0;
		if (postDetail.length > 0) {	
			$(window).on("load scroll", function() {
				var height = postDetail.outerHeight();
				if(($(window).scrollTop() + $(window).height()) >= height && !postDetailHasLoaded) {

					/* set postDetailHasLoaded */
					postDetailHasLoaded = 1;

					/* load recentPost */
					relatedPost();

					/* load commentPost */
					postComment();

				}
			});						
		}					
	}		

});	


/* main-nav */
function mainNav()
{

	const menuIds = ["#main-content", "#main-categories", "#main-archive", "#main-sidebar"];

	/* unbind first */
	$("#main-nav div.nav-link").unbind("click");
	$("#main-nav div.nav-link").on("click", function(){
		let menu = $(this),
		selection = menu.data('nav');

		/* remove class active global */
		$("#main-nav div.nav-link").removeClass('active fw-bold');

		/* add class active current selection */
		menu.addClass('active fw-bold');

		/* hide element not selection */

		$("#main-content, #main-categories, #main-archive, #main-sidebar").addClass('d-none');

		/* show selection element */
		$("#main-" + selection).removeClass('d-none');

		/* hide header */
		$("#widget-main-header, #widget-main-pinned").addClass('d-none');
	});

	/* back to content */
	$(".back-to-content").on("click", function(){
		/* hide all element */
		$("#main-categories, #main-archive, #main-sidebar").addClass('d-none');

		/* remove class active */
		$("#main-nav div.nav-link").removeClass('active fw-bold');

		/* show header and main content */
		$("#widget-main-header, #widget-main-pinned, #main-content").removeClass('d-none');
	})					
}

/* dark mode */
function darkMode()
{
	/* remove event first */
	$(".dark-mode").unbind("click");

	/* then add event again */
	$(".dark-mode").on("click", function(){
		let icon = $("i", this);
		if (icon.hasClass('bi-moon')) {
			icon.removeClass('bi-moon').addClass('bi-brightness-high');
			$("body").addClass('dark-mode');
			$("#main-header, #main-nav").removeClass('navbar-light bg-white').addClass('navbar-dark bg-dark');
			localStorage.setItem("dark", "true");
		}else{
			icon.removeClass('bi-brightness-high').addClass('bi-moon');
			$("body").removeClass('dark-mode');
			$("#main-header, #main-nav").removeClass('navbar-dark bg-dark').addClass('navbar-light bg-white');
			localStorage.removeItem('dark');							
		}
	})

	/* check localstorage */
	if (localStorage.dark) {
		$(".dark-mode i").removeClass('bi-moon').addClass('bi-brightness-high');
		$("body").addClass('dark-mode');
		$("#main-header, #main-nav").removeClass('navbar-light bg-white').addClass('navbar-dark bg-dark');
	}
}

/* carousel index */
function carouselIndex(){
	if ($("#carouselTrending").length > 0) {						
		const carousel = new bootstrap.Carousel('#carouselTrending');
	}
}

/* post index pagination */
function postPaginationMultiple(callback)
{

	/* get and check pagination link */
	var postPaginationMultipleLink = $("#postPaginationMultiple a.pagination-link"),
	postPaginationMultipleLinkUrl = postPaginationMultipleLink.attr('href'),
	postPaginationMultipleLinkLoading = postPaginationMultipleLink.data('loading');

	if (postPaginationMultipleLinkUrl !== undefined) {

		/* send animation */
		$("#postPaginationMultiple").html(`<div class="text-center py-3"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">${postPaginationMultipleLinkLoading}</span></div></div>`);

		$.ajax({
			url: postPaginationMultipleLinkUrl,
			dataType: 'html',
			success: function(output) {												

				/* must have delay for prevent fast call again function */
				setTimeout(function() {

					/* grab pagination */
					let paging_link = $(output).find('#postPaginationMultiple a.pagination-link');

					/* replace pagination with new link */
					$("#postPaginationMultiple").html(paging_link.clone());

					/* append new posts */
					$('#postIndex').append($('#postIndex', $(output).wrap("<div/>")).html()); 

					/* ads feed */
					let adsFeed = $(output).find('.ads-move-to-feed');          
					$(".ads-target-feed:last").append(adsFeed);

					/* check if paging not exist */
					if (paging_link.length > 0) {

						/* run callback */
						callback();

					}else{
						$("#postPaginationMultiple").html(`<div class="text-center text-success fw-bold fs-3"><i class="bi bi-check-circle"></i></div>`);
					}

				}, 1000);
			}
		})
	}
}

/* related post */
function relatedPost()
{
	const relatedPost = $("#relatedPost"),
	recentPostLimit = relatedPost.data('limit'),				
	recentPostId = relatedPost.data('id'),			
	relatedPostTitle = relatedPost.data('title'),
	relatedPostLang = relatedPost.data('lang');			

	/* check if have relatedPost element */
	if(relatedPost.length > 0) {

		/* split labels */
		const postLabels = relatedPost.data('labels').split(',');

		/* check labels length */			
		if (postLabels.length < 1) {
			/* remove loading */
			relatedPost.remove();
			return false;
		}

		/* first give animation */
		relatedPost.html(`
			<div class="text-center py-3"><div class="spinner-grow text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
			</div></div>
			`);

		/* define variable for temp data */
		let async_request=[],
		responses=[];

		/* lets request all feed label */
		$.each(postLabels, function(i, label){					
			async_request.push($.ajax({
				url:"/feeds/posts/default/-/"+ label + "?alt=json-in-script&max-results=5&callback=?", 
				method:'get',
				dataType: 'jsonp',
				success: function(data){
					/* push data to response variable */
					responses.push(data);
				}
			}));
		})

		/* after all request done > extract data */
		$.when.apply(null, async_request).done( function(){
			let posts = [],
			known = {};
			$.each(responses, function(i, response){
				$.each(response.feed.entry, function(i, post){
					let data = [];						
					data.id = post.id.$t.substr(post.id.$t.indexOf("post-") + 5);
					data.title = post.title.$t;

					/* get date as format */
					const dateFormat =  data => {
						let format_moth;
						if (relatedPostLang == 'id') {
							format_moth = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September", "Oktober", "November", "Desember"];
						}else{									
							format_moth = ["January","February","March","April","May","June","July","August","September", "October", "November", "December"];
						}
						let date = new Date(data),
						day = date.getDate(),
						month = format_moth[date.getMonth()],
						year = date.getFullYear();
						return `${day} ${month} ${year}`;
					};

					data.published = dateFormat(post.published.$t);
					data.updated = dateFormat(post.updated.$t);

					/* get post url */
					$.each(post.link, function(i, link){
						if (link.rel == "alternate") {
							/* set post url */
							data.url = link.href;
						}
					})

					if (post.media$thumbnail) {
						data.image = post.media$thumbnail.url.replace("/s72-c/","/w150/");
					}else{
						data.image = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3Ia32aeortEtnG6libJiXjj6It8o5ikSjQEaPSvLK09ORfnWovo0FQX25VeAB-cSySlozaol3LZ-9C7BVpfeMMcxtEE7SxW-BCLVX4wwywof7kiBCp8nsHbre7ScleqehuZzY0G17M1mBV1H-KzYd1QW098SZzEAHE0GecLG5u2ULhnEYtKTsWUMp/w300/no-image.jpg';
					}

					posts.push(data);
				})	
			})

			/* console.info(posts); */

			/* filter posts from current post */
			posts = posts.filter(function(post) {  
				return post.id !== recentPostId; 
			}); 

			/* filter posts from duplicate post by id */
			const removeDupliactes = e => {
				let t = e.map(e => Object.values(e).join(""));
				return e.filter((e, i) => t.indexOf(t[i]) === i)
			};
			posts = removeDupliactes(posts);

			/* random posts */	
			const shuffle = e => {
				for (var t, i, n = e.length; 0 !== n;) i = Math.floor(Math.random() * n), t = e[n -= 1], e[n] = e[i], e[i] = t;
					return e
			};		
			posts = shuffle(posts);

			/* limit posts */
			posts = posts.slice(0, recentPostLimit);

			/* console.info(posts); */

			/* then build data with unique posts */
			if (posts.length > 0) {					
				let relatedpostHtml = `<div class="list-group rounded-0 w-auto px-3 px-md-4 py-2">
				<strong class="fs-4 mb-2">
				${relatedPostTitle}
				</strong>`;
				$.each(posts, function(i, post) {						
					relatedpostHtml += `										
					<a class="post-card list-group-item list-group-item-action d-flex align-items-center gap-3 p-0" href="${post.url}">
					<div class="post-image">
					<img src="${post.image}"/>
					</div>
					<div class="d-flex flex-column py-2">
					<h2 class="post-title m-auto py-2">${post.title}</h2>
					<small class="post-date">
					${post.published}
					</small>
					</div>
					</a>
					`;
				})
				relatedpostHtml += `</div>`;

				/* send to DOM */
				relatedPost.html(relatedpostHtml);
			}else{
				/* remove relatedPost */
				relatedPost.remove();				
			}
		});

	}
}	

/* post comment */
function postComment()
{

	/* check if have comment-editor element */
	if ($("#comment-editor").length > 0) {

		/* load commentPost */
		$.getScript( "https://www.blogger.com/static/v1/jsbin/3262169375-comment_from_post_iframe.js", function( data, textStatus, jqxhr ) {
			BLOG_CMT_createIframe('https://www.blogger.com/rpc_relay.html');

			/* reply button */
			let iframeSrc = $("#comment-editor").data('src').split('#');
			$(".commentActionButton").on("click", function(){

				/* get form data  */
				let form = $("#commentForm"),
				/* get id from this button */
				id = $(this).data('id');

				/* build iframe from current data */
				let frame = $("#comment-editor"),
				container = (id != "addNewComment") ? $('#form-container-' + id) : $("#commentFormWrapper");
				frame.attr('src', (id != "addNewComment") ? iframeSrc[0] + '&parentID=' + id + '#' + iframeSrc[1] : iframeSrc[0] + '#' + iframeSrc[1]);

				/* toggle addNewComment */
				if (id != "addNewComment") {
					$("#addNewcomment").removeClass('d-none');
				}else{
					$("#addNewcomment").addClass('d-none');
				}

				/* send iframe */
				container.html(form);
			})
		});
	}
}	

/* ads move */
function adsMovePost()
{
	let countTargetMiddle = $(`.post-content p`).length, middleElement = parseInt(countTargetMiddle / 2);;
	$('.ads-move-to-post-middle').insertAfter(`.post-content p:nth-of-type(${middleElement})`);
	$(".ads-move-to-post-bottom").appendTo(".ads-target-post-bottom");
}

function adsMoveFeed()
{
	$(".ads-move-to-feed").appendTo(".ads-target-feed");
}

/* back to top button */
function backToTop()
{			
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$("#btn-back-to-top").fadeIn();
		} else {
			$("#btn-back-to-top").fadeOut();
		}
	});

	$("#btn-back-to-top").click(function(){
		$("html, body").animate({scrollTop: 0}, 200);
	});
}

/* toast */
function showToast(message)
{
	$("#main-toast .toast-body").html(message);
	let bsAlert = new bootstrap.Toast(document.getElementById('main-toast'));
	bsAlert.show();
}

/* copythis */
function copyThis(data) {
	$("body").append(`<textarea id="gocopy">${data}</textarea>`);
	$("#gocopy").select();
	document.execCommand('copy');
	$("#gocopy").remove();
	/* show message */
	showToast('Success Copy');
}		  