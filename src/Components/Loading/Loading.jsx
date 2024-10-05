import { tailChase } from 'ldrs';
import './Loading.scss';

function Loading() {
     tailChase.register();

     return (
          <div className="loading">
               <l-tail-chase
                    size="40"
                    speed="1.75"
                    color="black"
               ></l-tail-chase>
          </div>
     );
}

export default Loading;