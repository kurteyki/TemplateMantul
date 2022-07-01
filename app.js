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

	/* load carousel */
	carouselIndex();

	/* load Nav */
	mainNav();

	/* load darkMode */
	darkMode();			

	/* load postPaginationMultiple */
	postPaginationMultiple();

	/* Load adsMove */
	adsMove();

	/* load back to top */
	backToTop();

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
		$("#main-nav div.nav-link").removeClass('active');

		/* add class active current selection */
		menu.addClass('active');

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
		$("#main-nav div.nav-link").removeClass('active');

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
function postPaginationMultiple()
{
	let postIndex = $("#postPaginationMultiple"), postIndexHasLoaded = 0;
	if (postIndex.length > 0) {	
		$(window).on("load scroll", function() {
			if(($(window).scrollTop() + $(window).height()) >= ($(document).height() - 100) && !postIndexHasLoaded) {

				/* set postIndexHasLoaded */
				postIndexHasLoaded = 1;

				/* get and check pagination link */
				var postPaginationMultipleLink = $("#postPaginationMultiple a.pagination-link"),
				postPaginationMultipleLinkUrl = postPaginationMultipleLink.attr('href'),
				postPaginationMultipleLinkLoading = postPaginationMultipleLink.data('loading');

				if (postPaginationMultipleLinkUrl !== undefined) {

					/* send animation */
					$("#postPaginationMultiple").html(`<div class="text-center py-3"><div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">${postPaginationMultipleLinkLoading}</span>
						</div></div>`);

					$.ajax({
						url: postPaginationMultipleLinkUrl,
						dataType: 'html',
						success: function(output) {												

							setTimeout(function() {
								/* replace pagination with new link */
								$("#postPaginationMultiple").html($(output).find('#postPaginationMultiple a.pagination-link').clone());

								/* append new posts */
								$('#postIndex').append($('#postIndex', $(output).wrap("<div/>")).html()); 

								/* ads feed */
								let adsFeed = $(output).find('.ads-move-to-feed');          
								$(".ads-target-feed:last").append(adsFeed);

								/* set postIndexHasLoaded */
								postIndexHasLoaded = 0;
							}, 1000);
						}
					})
				}else{
					$("#postPaginationMultiple").html(`<div class="text-center text-success fw-bold fs-3"><i class="bi bi-check-circle"></i></div>`);
				}

			}
		});		
	}
}

/* related post */
function relatedPost()
{
	const relatedPost = $("#relatedPost"),
	recentPostLimit = relatedPost.data('limit'),				
	recentPostId = relatedPost.data('id'),			
	relatedPostTitle = relatedPost.data('title');

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
						let format_moth = ["January","February","March","April","May","June","July","August","September", "October", "November", "December"];
						let date = new Date(data),
						day = date.getDate(),
						month = format_moth[date.getMonth()],
						year = date.getFullYear();
						return `${month} ${day}, ${year}`;
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
function adsMove()
{
	let countTargetMiddle = $(`.post-content p`).length, middleElement = parseInt(countTargetMiddle / 2);;
	$('.ads-move-to-post-middle').insertAfter(`.post-content p:nth-of-type(${middleElement})`);

	$(".ads-move-to-post-bottom").appendTo(".ads-target-post-bottom");

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