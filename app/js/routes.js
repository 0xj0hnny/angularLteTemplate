angular.module('adminLte').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        'use strict';


        
        $urlRouterProvider
            .when('', '/')
            .otherwise('/404');


        $stateProvider

            /* --------------------------------------------------------- */
            /*  404
            /* --------------------------------------------------------- */
            .state('404', {
                url: '/404',
                controller: '404Ctrl',
                templateUrl: '/views/404/root.html',
                onEnter: [function() {

                }]
            })


            /* --------------------------------------------------------- */
            /*  HOME
            /* --------------------------------------------------------- */
            .state('home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: '/views/home/root.html',
                onEnter: [function() {

                }]
            });

        

    }]);
