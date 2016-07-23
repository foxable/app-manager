<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <base href="{{ url('/') }}/"/>

    <title>Foxable App Manager</title>

    <!-- Fonts -->
    <link href="{{ asset('assets/vendor/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel="stylesheet"/>

    <!-- Styles -->
    <link href="{{ asset('assets/vendor/bootstrap/bootstrap.min.css') }}" rel="stylesheet"/>
    <link href="{{ asset('assets/css/app-manager.css') }}" rel="stylesheet"/>    
</head>
<body id="app-layout">
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="{{ url('/') }}">
                    Foxable App Manager
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    <li><a href="{{ url('/apps') }}"><i class="fa fa-star" aria-hidden="true"></i> My Applications</a></li>
                    <li><a href="{{ url('/all-apps') }}"><i class="fa fa-bars" aria-hidden="true"></i> All Applications</a></li>
                    <li><a href="{{ url('/apps') }}"><i class="fa fa-users" aria-hidden="true"></i> Users</a></li>      
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    @if (Auth::guest())
                        <li><a href="{{ url('/login') }}">Login</a></li>
                        <li><a href="{{ url('/register') }}">Register</a></li>
                    @else
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    @yield('content')

    <!-- JavaScripts -->
    <script src="{{ asset('assets/vendor/core-js/shim.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/zone.js/zone.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/reflect-metadata/Reflect.js') }}"></script>
    <script src="{{ asset('assets/vendor/systemjs/system.js') }}"></script>    
    <!-- 2. Configure SystemJS -->
    <script src="{{ asset('assets/js/system.config.js') }}"></script>
    <!--<script src="{{ asset('assets/vendor/ng2-bootstrap/ng2-bootstrap.min.js') }}"></script>-->
    <script src="{{ asset('assets/js/dependencies.bundle.js') }}"></script>
    <script src="{{ asset('assets/js/app-manager.bundle.js') }}"></script>
    <script type="text/javascript">
        System.import('app-manager/core/bootstrap.js').catch(function(err){ console.error(err); });
    </script>
</body>
</html>
