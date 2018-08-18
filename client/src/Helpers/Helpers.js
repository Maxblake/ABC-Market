export const handleChange = (event) => {
        switch(event.target.type) {
            let {value} = e.target
            case "text":
                if(value="") {
                    e.target.setAttribute("error","true")
                    this.setState(errors[e.target.name]:true)
                } else {
                    this.setState(errors[e.target.name]:false)
                }
                break;
            case "number":
                if(value<=0) {
                    e.target.setAttribute("error","true")
                    this.setState(errors[e.target.name]:true)
                } else {
                    this.setState(errors[e.target.name]:false)
                }
                break;
            // case "date" :

                
                
        }
        this.setState({ [event.target.name]:event.target.value })
    }