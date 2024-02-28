@extends('padrao')
@section('content')


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/css.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
    <title>SRFV Games</title>
</head>
<body background="images/b.jpg">
  

<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Por favor insira seu login e senha!</p>

              <div class="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX">Email</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX">Senha</label>
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="/alterarsenha">Esqueceu sua senha?</a></p>

              <button class="btn btn-outline-light btn-lg px-5" type="submit"><a class="text-white-50" href="/">Login</button>

              <div class="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="https://www.facebook.com/" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                <a href="https://twitter.com/i/flow/login" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="https://accounts.google.com/v3/signin/identifier?hl=pt-br&ifkv=ATuJsjzAVUz_8FAsjmfa3qVAm_vimx7Ip2zoRrLwkqbAIjogVK8JpiB-DmjDtywKS6pLZsSbBzyPLw&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S420403992%3A1708351767342737&theme=glif" class="text-white"><i class="fab fa-google fa-lg"></i></a>
              </div>

            </div>

            <div>
              <p class="mb-0">Não possui uma conta? <a href="/signup" class="text-white-50 fw-bold">Cadastrar</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    
  </div>
</body>
</html>

</body>
</html>
@endSection