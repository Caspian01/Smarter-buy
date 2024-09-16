export default function AdTextInputs(){
    return(
        <> 
        <label htmlFor="titleIn">Title</label>
                <input name="title" id="titleIn" type="text" placeholder="Title"/>

                <label htmlFor="priceIn">Price</label>
                <input name="price" id="priceIn" type="number" placeholder="Price"/>

                <label htmlFor="categoryIn">Category</label>
                <select name="category" id="categoryIn" defaultValue='0'>
                    <option disabled value="0">Select category</option>
                    <option value="car">🚗 Cars</option>
                    <option value="electronics">📱 Electronics</option>
                    <option value="properties">🏠 Properties</option>
                    <option value="clothes">👚 Clothes</option>
                </select>

                <label htmlFor="descriptionIn">Description</label>
                <textarea name="description" id="descriptionIn" placeholder="Description"></textarea>

                <label htmlFor="contanctIn">Contact information</label>
                <textarea name="contact" id="contanctIn" placeholder="Mobile: +1 456 371 5986"></textarea>
        
        </>
    );
}