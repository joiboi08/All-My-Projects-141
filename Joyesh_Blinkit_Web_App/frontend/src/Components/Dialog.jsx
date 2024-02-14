
export function Dialog({isOpen, onClose, title, children}) {
    // isOpen has the state variable and onClose has the respective close handler func 
  
    if (!isOpen) {  // if no button clicked, no dialog shall open
      return null;
    }
    
    // {children} contains all the elements inside the <Dialog></Dialog>
    return (
      <div id="dialog" style={{ 
        display : "flex",
        flexDirection : "column",
        borderRadius : "20px",
        position: 'fixed', 
        top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', 
        backgroundColor : "rgb(87, 218, 254)", 
        padding: '20px', 
        zIndex: 100 }}>
        <h2>{title}</h2>
        {children}
  
        <button onClick={onClose}>Close</button>
      </div>
    )
  }