import { mount } from "@vue/test-utils"
import AddMesto from "@/views/AddMesto.vue"

describe("AddMesto.vue", () => {
  it("it validates if ptt is empty", async () =>{
    const wrapper = mount(AddMesto);
    await wrapper.find('form').trigger('submit.prevent');
    let errorPtt = wrapper.find('.errorPtt');
    expect(errorPtt.text()).toBe("Polje ne moze biti prazno");
  })

  it("it validates if ptt is numerci", async () =>{
    const wrapper = mount(AddMesto);
    const pttInput = wrapper.find('.pttInput');
    await pttInput.setValue('t');
    await wrapper.find('form').trigger('submit.prevent');
    let errorPtt = wrapper.find('.errorPtt');
    expect(errorPtt.text()).toBe("Polje moze sadrzati samo cifre");
  })

  it("it validates if ptt is length 5", async () =>{
    const wrapper = mount(AddMesto);
    const pttInput = wrapper.find('.pttInput');
    await pttInput.setValue('1234');
    await wrapper.find('form').trigger('submit.prevent');
    let errorPtt = wrapper.find('.errorPtt');
    expect(errorPtt.text()).toBe("Polje mora imati 5 cifara");
  })

  it("it validates if naziv is empty", async () =>{
    const wrapper = mount(AddMesto);
    await wrapper.find('form').trigger('submit.prevent');
    let errorNaziv = wrapper.find('.errorNaziv');
    expect(errorNaziv.text()).toBe("Polje ne moze biti prazno");
  })

  it("it validates if naziv starts with capital letter", async () =>{
    const wrapper = mount(AddMesto);
    const nazivInput = wrapper.find('.nazivInput');
    await nazivInput.setValue('t');
    await wrapper.find('form').trigger('submit.prevent');
    let errorNaziv = wrapper.find('.errorNaziv');
    expect(errorNaziv.text()).toBe("Polje mora pocinjati velikim slovom");
  })

  it("it validates if naziv is minimum length 2", async () =>{
    const wrapper = mount(AddMesto);
    const nazivInput = wrapper.find('.nazivInput');
    await nazivInput.setValue('T');
    await wrapper.find('form').trigger('submit.prevent');
    let errorNaziv = wrapper.find('.errorNaziv');
    expect(errorNaziv.text()).toBe("Polje mora imati minimum 2 karaktera");
  })

  it("it validates if naziv is maximum length 35", async () =>{
    const wrapper = mount(AddMesto);
    const nazivInput = wrapper.find('.nazivInput');
    await nazivInput.setValue('Lorem ipsum dolor sit amet consectetur');
    await wrapper.find('form').trigger('submit.prevent');
    let errorNaziv = wrapper.find('.errorNaziv');
    expect(errorNaziv.text()).toBe("Polje mora imati maksimum 35 karaktera");
  })

  it("it validates if brojStanovnika is empty", async () =>{
    const wrapper = mount(AddMesto);
    await wrapper.find('form').trigger('submit.prevent');
    let errorBrojStanovnika = wrapper.find('.errorBrojStanovnika');
    expect(errorBrojStanovnika.text()).toBe("Polje ne moze biti prazno");
  })

  it("it validates if brojStanovnika is numerci", async () =>{
    const wrapper = mount(AddMesto);
    const brojStanovnikaInput = wrapper.find('.brojStanovnikaInput');
    await brojStanovnikaInput.setValue('t');
    await wrapper.find('form').trigger('submit.prevent');
    let errorBrojStanovnika = wrapper.find('.errorBrojStanovnika');
    expect(errorBrojStanovnika.text()).toBe("Polje moze sadrzati samo cifre");
  })

  it("it validates if brojStanovnika is greater than zero", async () =>{
    const wrapper = mount(AddMesto);
    const brojStanovnikaInput = wrapper.find('.brojStanovnikaInput');
    await brojStanovnikaInput.setValue(0);
    await wrapper.find('form').trigger('submit.prevent');
    let errorBrojStanovnika = wrapper.find('.errorBrojStanovnika');
    expect(errorBrojStanovnika.text()).toBe("Polje mora biti vece od nule");
  })
  

})