import Autocomplete from "react-autocomplete";

const SimpAutocomplete = ({data,proparray,value}) => {
    console.log(data);
return (
    <>
    <Autocomplete 
    getItemValue={(item) => item.ocptdtcod}
    items={data} 
    renderItem={(item, isHighlighted) =>
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.ocptdesc}
        </div>
    }
    value={value}
    onChange={(e) => console.log(e.target.value)}
    onSelect={(val) => console.log(val)}
    />
    

    </>
)
    
};
export default SimpAutocomplete;