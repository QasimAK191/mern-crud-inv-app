import React from 'react'


class ReportPage extends React.Component {
  render() {
    return(
      <div>
       <header
                    className="App-header"
                    style={{
                    height: '50px'
                }}>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous"/>

                    <strong>
                        Reports
                    </strong>
                </header>
<body style={{marginTop:'50px'}}>
<center>
<button>
                                <h3>
                                <a href="/shopping" id="page-comp">Inventory Order List</a>
                                          </h3>
                            </button>
                            <br />
                            
                            </center>
                            </body>  
            </div>
  )
        }}


        export default ReportPage;
