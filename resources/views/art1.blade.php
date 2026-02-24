@extends('padrao')
@section('content')

<!-- ***** Banner Start ***** -->
<div class="row">
  <div class="col-lg-12">
    <div class="main-profile">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <img src="{{ asset('assets/arts/discord.jpg') }}" alt="">
        </div>
        <div class="col-lg-4 col-md-4 align-self-center">
          <div class="main-info header-text">
            <span>SRFV</span>
            <h4>Envie sua Arte</h4>
            <p>Toda semana selecionamos as melhores artes para colocar no Site, envie agora!</p>
            <div class="main-border-button">
              <a href="https://discord.gg/jqpxr8RM" target="_blank">Clique aqui</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 align-self-center">
          <ul>
            <li>Artes Enviadas <span>36</span></li>
            <li>Artes em Analise <span>18</span></li>
            <li>Artes Disponiveis <span>12</span></li>
          </ul>
        </div>
      </div>

      <!-- Popular Arts -->
      <div class="row">
        <div class="col-lg-12">
          <div class="clips">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Artes mais</em> Populares</h4>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/arts/a.png') }}" alt="">
                    <a href="{{ asset('assets/arts/a.png') }}" download><i class="fa fa-download"></i></a>
                  </div>
                  <div class="down-content">
                    <h4>1.Bumblebee</h4>
                    <span><i class="fa fa-eye"></i> 10.495</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/arts/b.webp') }}" alt="">
                    <a href="{{ asset('assets/arts/b.webp') }}" download><i class="fa fa-download"></i></a>
                  </div>
                  <div class="down-content">
                    <h4>2.Bomberman</h4>
                    <span><i class="fa fa-eye"></i> 9.345</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/arts/k.webp') }}" alt="">
                    <a href="{{ asset('assets/arts/k.webp') }}" download><i class="fa fa-download"></i></a>
                  </div>
                  <div class="down-content">
                    <h4>3.Knuckles</h4>
                    <span><i class="fa fa-eye"></i> 7.141</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="item">
                  <div class="thumb">
                    <img src="{{ asset('assets/arts/s.webp') }}" alt="">
                    <a href="{{ asset('assets/arts/s.webp') }}" download><i class="fa fa-download"></i></a>
                  </div>
                  <div class="down-content">
                    <h4>4.Shadow</h4>
                    <span><i class="fa fa-eye"></i> 5.398</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- ***** Banner End ***** -->

<!-- ***** All Arts Start ***** -->
<div class="other-games">
  <div class="row">
    <div class="col-lg-12">
      <div class="heading-section">
        <h4><em>Todas as</em> Artes</h4>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/a.png') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/a.png') }}" download><i class="fa fa-download"></i></a>
        <h4>Bumblebee</h4><span>By Fallen</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.1</li>
          <li><i class="fa fa-download"></i> 242</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/b.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/b.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Bomberman</h4><span>By Victor</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.4</li>
          <li><i class="fa fa-download"></i> 1.132</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/e.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/e.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Bob Esponja</h4><span>By Steam-X</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.8</li>
          <li><i class="fa fa-download"></i> 346</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/m.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/m.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Luigi</h4><span>By ElTopoGira</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.2</li>
          <li><i class="fa fa-download"></i> 9.471</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/n.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/n.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Pizza Tower</h4><span>By Max 3D</span>
        <ul>
          <li><i class="fa fa-star"></i> 3.1</li>
          <li><i class="fa fa-download"></i> 1.120</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/s.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/s.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Shadow</h4><span>By FonSekito</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.1</li>
          <li><i class="fa fa-download"></i> 329</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/k.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/k.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Knuckles</h4><span>By CrashGamis</span>
        <ul>
          <li><i class="fa fa-star"></i> 3.9</li>
          <li><i class="fa fa-download"></i> 2.323</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/c.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/c.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>Polygoth</h4><span>By Legendary</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.9</li>
          <li><i class="fa fa-download"></i> 738</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/images/game-03.jpg') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/images/game-03.jpg') }}" download><i class="fa fa-download"></i></a>
        <h4>Space Boy</h4><span>By Cyborg</span>
        <ul>
          <li><i class="fa fa-star"></i> 3.4</li>
          <li><i class="fa fa-download"></i> 198</li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="item">
        <img src="{{ asset('assets/arts/to.webp') }}" alt="" class="templatemo-item">
        <a href="{{ asset('assets/arts/to.webp') }}" download><i class="fa fa-download"></i></a>
        <h4>TO MA TO</h4><span>By Anjo_Aguiel</span>
        <ul>
          <li><i class="fa fa-star"></i> 4.3</li>
          <li><i class="fa fa-download"></i> 3.301</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<!-- ***** All Arts End ***** -->

@endsection
