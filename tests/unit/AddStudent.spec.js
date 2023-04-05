import { mount, flushPromises } from '@vue/test-utils'
import routes from "@/router/index.js" // This import should point to your routes file declared above
import AddStudent from "@/views/AddStudent.vue"
import axios from 'axios'
import { FakultetService } from '@/services/FakultetService'

//input BROJ INDEKSA
test("test if input value BROJ INDEKSA is empty", async () => {
  const wrapper = mount(AddStudent);
  await wrapper.find('form').trigger('submit.prevent');
  let errorBrojIndeksa = await wrapper.find('.errorBrojIndeksa');
  expect(errorBrojIndeksa.text()).toBe("Polje ne moze biti prazno");
})

test("test if input value BROJ INDEKSA has incorrect format", async () => {
  const wrapper = mount(AddStudent);
  const inputBrojIndeksa =  await wrapper.find('.inputBrojIndeksa');
  await inputBrojIndeksa.setValue('123');
  await wrapper.find('form').trigger('submit.prevent');
  let errorBrojIndeksa = await wrapper.find('.errorBrojIndeksa');
  expect(errorBrojIndeksa.text()).toBe("Broj indeksa mora biti u formatu 21/3720, prve dve cifre za godinu i maksimalno 4 cifre za redni broj");
})
//input IME
test("test if input value IME is empty", async () => {
  const wrapper = mount(AddStudent);
  await wrapper.find('form').trigger('submit.prevent');
  let errorIme = await wrapper.find('.errorIme');
  expect(errorIme.text()).toBe("Polje ne moze biti prazno");
})

test("test if input value IME starts with capital letter", async () => {
  const wrapper = mount(AddStudent);
  const inputIme =  await wrapper.find('.inputIme');
  await inputIme.setValue('test');
  await wrapper.find('form').trigger('submit.prevent');
  let errorIme = await wrapper.find('.errorIme');
  expect(errorIme.text()).toBe("Polje mora pocinjati velikim slovom");
})

test("test if input value IME has min length of 2", async () => {
  const wrapper = mount(AddStudent);
  const inputIme =  await wrapper.find('.inputIme');
  await inputIme.setValue('T');
  await wrapper.find('form').trigger('submit.prevent');
  let errorIme = await wrapper.find('.errorIme');
  expect(errorIme.text()).toBe("Polje mora imati minimum 2 karaktera");
})

test("test if input value IME has max length of 35", async () => {
  const wrapper = mount(AddStudent);
  const inputIme =  await wrapper.find('.inputIme');
  await inputIme.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper.find('form').trigger('submit.prevent');
  let errorIme = await wrapper.find('.errorIme');
  expect(errorIme.text()).toBe("Polje mora imati maksimum 35 karaktera");
})

//input PREZIME
test("test if input value PREZIME is empty", async () => {
  const wrapper = mount(AddStudent);
  await wrapper.find('form').trigger('submit.prevent');
  let errorPrezime = await wrapper.find('.errorPrezime');
  expect(errorPrezime.text()).toBe("Polje ne moze biti prazno");
})

test("test if input value PREZIME starts with capital letter", async () => {
  const wrapper = mount(AddStudent);
  const inputPrezime =  await wrapper.find('.inputPrezime');
  await inputPrezime.setValue('test');
  await wrapper.find('form').trigger('submit.prevent');
  let errorPrezime = await wrapper.find('.errorPrezime');
  expect(errorPrezime.text()).toBe("Polje mora pocinjati velikim slovom");
})

test("test if input value PREZIME has min length of 2", async () => {
  const wrapper = mount(AddStudent);
  const inputPrezime =  await wrapper.find('.inputPrezime');
  await inputPrezime.setValue('T');
  await wrapper.find('form').trigger('submit.prevent');
  let errorPrezime = await wrapper.find('.errorPrezime');
  expect(errorPrezime.text()).toBe("Polje mora imati minimum 2 karaktera");
})

test("test if input value PREZIME has max length of 35", async () => {
  const wrapper = mount(AddStudent);
  const inputPrezime =  await wrapper.find('.inputPrezime');
  await inputPrezime.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper.find('form').trigger('submit.prevent');
  let errorPrezime = await wrapper.find('.errorPrezime');
  expect(errorPrezime.text()).toBe("Polje mora imati maksimum 35 karaktera");
})

//input DATUM RODJENJA
test("test if input value DATUM RODJENJA is empty", async () => {
  const wrapper = mount(AddStudent);
  await wrapper.find('form').trigger('submit.prevent');
  let errorDatumRodjenja = await wrapper.find('.errorDatumRodjenja');
  expect(errorDatumRodjenja.text()).toBe("Polje ne moze biti prazno");
})

//input JMBG  
test("test if input value JMBG is empty", async () => {
  const wrapper = mount(AddStudent);
  await wrapper.find('form').trigger('submit.prevent');
  let errorJMBG = await wrapper.find('.errorJMBG');
  expect(errorJMBG.text()).toBe("Polje ne moze biti prazno");
})

test("test if input value JMBG is numeric", async () => {
  const wrapper = mount(AddStudent);
  const inputJMBG =  await wrapper.find('.inputJMBG');
  await inputJMBG.setValue('test');
  await wrapper.find('form').trigger('submit.prevent');
  let errorJMBG = await wrapper.find('.errorJMBG');
  expect(errorJMBG.text()).toBe("Polje moze sadrzati samo cifre");
})

test("test if input value JMBG has 13 numbers", async () => {
  const wrapper = mount(AddStudent);
  const inputJMBG =  await wrapper.find('.inputJMBG');
  await inputJMBG.setValue('123456789');
  await wrapper.find('form').trigger('submit.prevent');
  let errorJMBG = await wrapper.find('.errorJMBG');
  expect(errorJMBG.text()).toBe("Polje mora imati 13 cifara");

  const inputJMBG1 =  await wrapper.find('.inputJMBG');
  await inputJMBG1.setValue('12345678912345');
  await wrapper.find('form').trigger('submit.prevent');
  let errorJMBG1 = await wrapper.find('.errorJMBG');
  expect(errorJMBG1.text()).toBe("Polje mora imati 13 cifara");

})