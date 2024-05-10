
import RegresarBoton from '../components/RegresarBoton'
import DisplayReports from '../components/DisplayReports';
function ReportPage(){
    return(
        <div>

        <div className="header">
            <h1 className="title">Reportes</h1>
            <RegresarBoton 
            />
        </div>
        <div className='reports'>
            <DisplayReports/>
        </div>

        </div>
    )

}


export default ReportPage;

