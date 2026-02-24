@extends('padrao')
@section('content')

<div class="container my-5">
  <form method="post" action="{{ route('cadastrar-usuario') }}">
    @csrf
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Cadastrar</p>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <label for="inputNome" class="form-label">Insira o seu Nome</label>
                    <input type="text" class="form-control" name="name" id="inputNome" required>
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <label for="inputEmail" class="form-label">Insira seu Email</label>
                    <input type="email" class="form-control" name="email" id="inputEmail" required>
                  </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <label for="inputSenha" class="form-label">Sua Senha</label>
                    <input type="password" class="form-control" name="password" id="inputSenha" required>
                  </div>
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                  <label class="form-check-label" for="form2Example3c">
                    Estou de acordo com a afirmação <a href="https://policies.google.com/terms?hl=pt-BR" target="_blank">Termos de serviço</a>
                  </label>
                </div>

                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Registrar</button>
                </div>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Ilustração cadastro">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

@endsection