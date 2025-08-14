
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Conclua seu</span>
                <span className="block text-meta-600">Ensino Médio Online</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Seu futuro começa aqui. A Meta oferece educação de qualidade 100% online para adultos acima de 18 anos que desejam concluir o ensino médio com flexibilidade e reconhecimento oficial.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/cadastro">
                    <Button size="lg" className="w-full">
                      Comece Agora
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/como-funciona">
                    <Button variant="outline" size="lg" className="w-full">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full relative sm:h-72 md:h-96 lg:h-full lg:w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-meta-100 via-accent-50 to-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIca8cmNsZSBjeD0iMTYiIGN5PSI0NSIgcj0iMyIgZmlsbD0iIzBFQTVFOSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPGNpcmNsZSBjeD0iNiIgY3k9IjE1IiByPSIzIiBmaWxsPSIjMkREQ0JGIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8Y2lyY2xlIGN4PSI1MiIgY3k9IjEyIiByPSIzIiBmaWxsPSIjMEVBNUU5IiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8Y2lyY2xlIGN4PSIyOCIgY3k9IjMwIiByPSIxMiIgZmlsbD0iIzBFQTVFOSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+CjxjaXJjbGUgY3g9IjQ0IiBjeT0iNDIiIHI9IjUiIGZpbGw9IiMyRERDQkYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              className="h-auto max-h-full w-auto max-w-full object-contain"
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Estudante adulto estudando online"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
