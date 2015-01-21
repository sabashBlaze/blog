/*jshint multistr:true */
'use strict';


angular.module('FasbidClient')
        .directive('fbheader', ['ipCookie','Dataservice', '$location', '$window', '$rootScope','$routeParams','$idle','$modal',
            function(ipCookie,Dataservice, $location, $window, $rootScope,$routeParams,$idle, $modal) {
                return {
                    templateUrl: $location.protocol() + '://' + $location.host()+'/auctions/templates/header.html',
                    restrict: 'A',
                    scope: {
                        isopen: '=isopen'
                    },
                    link: function(scope) {
						//console.log('header='+JSON.stringify($routeParams));
						$idle.watch();
						scope.cats=[];
						scope.$on('$idleTimeout', function() {
							scope.timedout = $modal.open({
								templateUrl: 'timedout-dialog.html',
								windowClass: 'modal danger',
								controller: 'Timeoutpopup',
								backdrop: 'static',
				                //keyboard: false,
							});
						});
						scope.$on('$idleEnd', function() {
							//scope.timedout.close();
						});
						/**scope.cancel=function(){
							scope.timedout.close();
						};*/
						if($routeParams.ref){
							var referBy=$routeParams.ref.split('a')[1];
							Dataservice.setReferBy(referBy).then(function(resu){
                                console.log(resu);
							});
							//console.log('referBy='+referBy);
						}
                        Dataservice.getCategories().then(function(result) {
                            scope.cats = result;
							var i=0;

                            // Add the -- All Categories ----
                            if (scope.cats && scope.cats.length > 0 && scope.cats[0].id !== 'allCategories') {
                                scope.cats.splice(0, 0, defaultCategory);
                            }

                            // Since this is a copy of the categories
                            // we have to reset isSelected of each object.
                            if (scope.cats) {
                                for (i = 0; i < scope.cats.length; i++) {
                                    scope.cats[i].isSelected = false;
                                }
                            }

                            // Set default.
                            if (scope.cats && scope.cats.length > 0) {
                                scope.selectedCategory = scope.cats[0];
                                scope.selectedCategory.isSelected = true;
                            }
							//console.log(defaultCategory);
							//console.log($routeParams);
							if($routeParams.c){
								for(i=0; scope.cats && i< scope.cats.length;i++){
									if(parseInt($routeParams.c,10)===parseInt(scope.cats[i].categoryId,10)){
										scope.searchCategory = {id: $routeParams.c , shortDesc: scope.cats[i].name};
										scope.changeCategory(scope.cats[i]);
										break;
									}
								}
							//scope.searchCategory = {id: $routeParams.c , shortDesc: "All Categories"}
							}
                        });
						if($routeParams.q){
							scope.searchTerm=$routeParams.q;
						}

                        if (scope.isopen) {
                            scope.openClass = 'open';
                        } else {
                            scope.openClass = '';
                        }

                        /****************

                         Functions changing top-margin of sort menu

                         *****************/

                        /* var cats = angular.element(document.querySelector('#cats'));
                         scope.$watch( function() {
                         return cats[0].clientHeight;
                         }, function() {
                         var height = cats[0].clientHeight;
                         var sorts = angular.element(document.querySelector('#sortbylist'));
                         //sorts.css('margin-top', height);
                         sorts.attr('style', 'margin-top: ' + (height + 20) + 'px' );
                         }); */

                        /****************

                         Functions related changing category.

                         *****************/

                        var defaultCategory = {
                            id: 'allCategories',
                            shortDesc: 'All Categories',
                        };


                        // this is the server for Members Only
                        //var signinurl = 'http://ec2-54-186-222-209.us-west-2.compute.amazonaws.com/#/';
                        //var signinurl = 'http://ec2-54-186-165-146.us-west-2.compute.amazonaws.com/#/';
                        var signinurl = '';  // same servers for all

                        // this is the server for non-Members
                        //var signouturl = 'http://ec2-54-186-222-209.us-west-2.compute.amazonaws.com/#/';
                        //var signouturl = 'http://ec2-54-186-165-146.us-west-2.compute.amazonaws.com/#/';
                        var signouturl = '/login';  // same servers for all


                        if (scope.selectedCategory) {
                            scope.selectedCategory.isSelected = false;
                        }


                        scope.sorts = [
                            {identifier: 1, text: 'Ending Soon'},
                            {identifier: 2, text: 'Ending Later'},
                            {identifier: 3, text: 'Highest Price'},
                            {identifier: 4, text: 'Lowest Price'},
                        ];

                        scope.selectedSort = scope.sorts[0];
                        scope.selectedSort.isSelected = true;

                        scope.changeCategory = function(c) {
                            scope.selectedCategory.isSelected = false;
                            scope.selectedCategory = c;
                            scope.selectedCategory.isSelected = true;
                            $rootScope.$broadcast('CHANGE_CATEGORY', {cat: c});
                        };


                        scope.changeSorting = function(s) {
                            scope.selectedSort.isSelected = false;
                            scope.selectedSort = s;
                            scope.selectedSort.isSelected = true;
                            $rootScope.$broadcast('CHANGE_SORT', {sortf: s});
                        };


                        /****************

                         Functions related changing search.

                         *****************/
						scope.searchCategory = defaultCategory;

                        scope.getSearchCategory = function() {
                            return scope.searchCategory.shortDesc;
                        };

                        scope.changeSearchCategory = function(c) {
                            scope.searchCategory = c;
                        };

                        scope.search = function(searchTerm) {
                            //scope.selectedCategory.isSelected = false;
							if(searchTerm === 'undefined'){
								searchTerm='';//testing
							}
                            if (scope.searchCategory !== defaultCategory) {
                                //console.log('fbheader.js: searchTerm ='+ searchTerm + ', categoryId = ' + scope.searchCategory.categoryId);
                                $location.search({'q': searchTerm, 'c': scope.searchCategory.categoryId}).path('search');
                            }
                            else {
                                //console.log('fbheader.js: searchTerm ='+ searchTerm);
                                $location.search({'q': searchTerm}).path('search');
                            }
                        };

                        /****************

                         Functions related to information

                         *****************/

                        scope.hasUser = function() {
                            return !!Dataservice.getUser();
                        };

                        scope.user = function() {
                            return Dataservice.getUser();
                        };
						if (typeof ipCookie('loginDetails') !== 'undefined' && typeof Dataservice.getUser() === 'undefined') {
							//$location.path('/myauctions');
							//console.log('Auto Log try');
							var result = Dataservice.login('', '', '');
							result.then( function(res){
								if (res){
									//$location.path('/myauctions');
									//$window.location.reload();
									//console.log(JSON.stringify(res));
									//$rootScope.back();
								} else {
									scope.loginMsg = Dataservice.getErrorMsg();
								}
							});
						}
                        scope.getCredits = function() {
                            return Dataservice.getCredits();
                        };
                        scope.getBalanceCredits = function() {
                            return Dataservice.getBalanceCredits();
                        };

                        scope.goToMyAuctions = function() {
                            // defaultCategory.isSelected = true;
                            // scope.selectedCategory.isSelected = false;
                            // scope.selectedCategory = defaultCategory;

                            $location.path('myauctions/current');
                        };

                        scope.signUp = function() {
                            //console.log('signup url = ' + $window.location.href);
                            if ($window.location.href === signouturl) {
                                $window.location.href = signinurl;
                            }

                            // defaultCategory.isSelected = true;
                            // scope.selectedCategory.isSelected = false;
                            // scope.selectedCategory = defaultCategory;
                            $location.path('login');
                            //console.log('signup2 url = ' + $window.location.href);
                        };

                        scope.signOut = function() {
                            //console.log('signOut url = ' + $window.location.href);
                            if ($window.location.href === signinurl) {
                                $window.location.href = signouturl;
                                //$location.path(signouturl);
                            }
                            //console.log('signOut2 url = ' + $window.location.href);
                            Dataservice.logout().then(function(result) {
                                if (result) {
                                   // $window.alert('Logged out');
                                    $location.path('/login');
                                    //$window.location.reload();
                                }
                            });
                        };

                    }
                };
            }]);
