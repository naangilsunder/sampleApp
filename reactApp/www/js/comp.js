// Copyright (c) 2016 TekCrew Inc, Cypress, CA. All rights reserved.
// Sundervel 09/10/2016

var EmpHeader = React.createClass({
    propTypes: {
        cleardata: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            firstName: '',
            lastName: '',
            phone: '',
            UserPhoto: ''
        };
    },
    handleFirstNameChange: function(event) {
        this.setState({
            firstName: event.target.value
        });
    },

    handleLastNameChange: function(event) {
        this.setState({
            lastName: event.target.value
        });
    },

    handlePhoneChange: function(event) {
        this.setState({
            phone: event.target.value
        });
    },
    uploadFile: function(ctrl) {
		
        var input = ctrl.currentTarget;
		
        if (input.files && input.files[0]) {
			
            var reader = new FileReader();
			
            reader.onload = function(e) {

                $('#photo-id').attr('src', e.target.result);

                var canvas = document.createElement("canvas");
				
                var imageElement = document.createElement("img");

                imageElement.setAttribute('src', e.target.result);
				
                canvas.width = imageElement.width;
				
                canvas.height = imageElement.height;
				
                var context = canvas.getContext("2d");
				
                context.drawImage(imageElement, 0, 0);

                var base64Image = canvas.toDataURL("image/jpeg");

                var str = base64Image.replace(/data:image\/jpeg;base64,/g, '');

                $('#photo').attr('value', str);

            }
            reader.readAsDataURL(input.files[0]);
        }
    },
    updateDb: function(header, newdata) {
        debugger
        $.post("http://localhost:8000/employee",
                newdata,
                function() {
					
                    alert("Data Saved");
					
                    header.setState({
                        lastName: ""
                    });
                    header.setState({
                        phone: ""
                    });
                    header.setState({
                        firstName: ""
                    });
                    header.props.cleardata();
					
                    $('#photo-id').attr('src', '');
                })
            .fail(function(err) {
                alert(err.responseJSON.message);

            })
            .always(function() {

            })
    },

    updateState: function() {

        var newdata = {
			
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            UserPhoto: $('#photo').val()
			
        };
        this.updateDb(this, newdata);

    },
	render: function () {
		return (
				<header>			
				   <table >
					  <tr>
						 <td><b> First name:</b></td>
						 <td><input type = "text" value={this.state.firstName} onChange={this.handleFirstNameChange} /></td>
						 <br/>
						 <br/>
					  </tr>
					  <tr>
						 <td> <b>Last name:</b> </td>
						 <td><input type = "text" value={this.state.lastName} onChange={this.handleLastNameChange} /></td>
						 <br/>
						 <br/>
					  </tr>
					  <tr>
						 <td><b> Phone:</b> </td>
						 <td><input type = "text"  value={this.state.phone} onChange={this.handlePhoneChange}/></td>
						 <br/>
						 <br/>		   
					  </tr>
					  <tr>
						 <td><b>Upload Photo</b></td>
						 <img  height="80" width="80"  id="photo-id"/>							  
						 <input type="file"  name="file" onChange= {this.uploadFile} id="photo-upload"/>
						 <br/>
						 <input type="text" hidden="true" 	 id="photo"/>
						 <td></td>
					  </tr>
					  <tr>
						 <td></td>
						 <td align="center"><input type = "button" className="btn btn-primary" onClick = {this.updateState}  value="Add" /></td>
						 <td></td>
					  </tr>
				   </table>
				   <br/>
				   <br/>				 
				</header>

		);
	}
});
		
var EmpDetails = React.createClass({
	
	getInitialState: function() {
		
		return this.state = {
			employees: []
		};
		
	},

	getEmployees: function() {
		
		$.get('http://localhost:8000/employee', function(data) {
			
			this.setState({
				employees: data
			})
			
		}.bind(this));
	},

	componentDidMount: function() {
		
		this.getEmployees();
		
	},
	    
	render: function() {
	  return (
				<div >
				<div >
				    <div className="panel panel-primary col-md-4">
					  <div className="panel-heading ">Employee Directory</div>
					  <div className="panel-body">					
				    <EmpHeader text="Employee Directory" cleardata={this.getEmployees}  />
				   </div>
				   </div>
				</div >
				   <div className="col-md-4">
					  <table className="table table-striped">
						 <tr>
							<td className="col-md-4"><b>First Name</b> </td>
							<td className="col-md-4"><b>Last Name</b> </td>
							<td className="col-md-2"><b>Phone </b></td>
							<td className="col-md-5"><b>Photo </b></td>
						 </tr>
						 <tbody>
							{this.state.employees.map(function(row, i) {
							return (
							<tr >
							   <td>{row.firstName}</td>
							   <td>{row.lastName}</td>
							   <td>{row.phone}</td>
							   <td><img  height="42" width="42" src = {"data:image/png;base64,"+ row.UserPhoto}/> </td>
							</tr>
							);
							})}
						 </tbody>
					  </table>
				   </div >
				</div >
	  );
	} 					 
});

ReactDOM.render(<div><EmpDetails /></div>, document.getElementById('container'));