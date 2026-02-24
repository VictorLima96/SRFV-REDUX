<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YcnS/1GiQ6lfMZ1aJ+7YR2s/9Y3lTRBiI3K6" crossorigin="anonymous">

    <link rel="icon" type="image/png" href="{{ asset('assets/images/favicon-srfv.png') }}"/>

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="{{ asset('assets/css/fontawesome.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/templatemo-cyborg-gaming.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/owl.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/animate.css') }}">
    <link rel="stylesheet" href="https://unpkg.com/swiper@11/swiper-bundle.min.css"/>
    <!-- SRFV Overrides - must be last -->
    <link rel="stylesheet" href="{{ asset('assets/css/css.css') }}">
    <title>SRFV Games</title>
</head>
<body class="text-center text-white label-center d-flex flex-column min-vh-100">

     <!-- ***** Header Area Start ***** -->
  <header class="header-area header-sticky">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <nav class="main-nav">
                    <!-- ***** Logo Start ***** -->
                    <a href="/" class="logo">
                        <img src="{{ asset('assets/images/logoz1.png') }}" width="70px" height="58px">
                    </a>
                    <!-- ***** Logo End ***** -->
                    <!-- ***** Search End ***** -->
                    <div class="search-input">
                      <form id="search" action="/" method="GET">
                        <input type="text" placeholder="Pesquise Aqui" id='searchText' name="searchKeyword" onkeypress="handle" />
                        <i class="fa fa-search"></i>
                      </form>
                    </div>
                    <!-- ***** Search End ***** -->
                    <!-- ***** Menu Start ***** -->
                    <ul class="nav">
                        <li><a href="/" class="active">Home</a></li>
                        <li><a href="/games1">Games</a></li>
                        <li><a href="/movies1">Movies</a></li>
                        <li><a href="/art1">Art</a></li>
                        @guest
                            <li><a href="/signup">Cadastrar</a></li>
                            <li><a href="{{ route('login') }}">Login</a></li>
                        @endguest
                        @auth
                            <li><a href="/alterarsenha">{{ Auth::user()->name }}</a></li>
                            <li>
                                <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                                    @csrf
                                    <button type="submit">Sair</button>
                                </form>
                            </li>
                        @endauth
                    </ul>   
                    <a class='menu-trigger'>
                        <span>Menu</span>
                    </a>
                    <!-- ***** Menu End ***** -->
                </nav>
            </div>
        </div>
    </div>
  </header>
  <!-- ***** Header Area End ***** -->
  <main class="flex-grow-1">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            @yield('content')
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <p>Copyright &copy; 2026 <a href="#">SRFV Games</a> Company. All rights reserved.
          <br>Design: <a href="#">SRFV Company</a></p>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
  <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
  <script src="{{ asset('assets/js/isotope.js') }}"></script>
  <script src="{{ asset('assets/js/owl-carousel.js') }}"></script>
  <script src="{{ asset('assets/js/tabs.js') }}"></script>
  <script src="{{ asset('assets/js/popup.js') }}"></script>
  <script src="{{ asset('assets/js/custom.js') }}"></script>
</body>
</html>



