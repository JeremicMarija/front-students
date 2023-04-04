import { mount, flushPromises } from '@vue/test-utils'
import routes from "@/router/index.js" // This import should point to your routes file declared above
import AddFakultet from "@/views/AddFakultet.vue"
import axios from 'axios'
import { MestoService } from '@/services/MestoService'

const mockMestoArr = MestoService.getAllMesta()

jest.spyOn(axios, 'get').mockResolvedValue(mockMestoArr);

test("test if input value maticniBroj is empty", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if maticniBroj is empty
  await wrapper.find('form').trigger('submit.prevent');
  let errorMaticniBroj = await wrapper.find('.errorMaticniBroj');
  expect(errorMaticniBroj.text()).toBe("Polje ne moze biti prazno");

})

test("test if input value maticniBroj is numeric", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if maticniBroj is numerci
  const inputMaticniBroj =  await wrapper.find('.inputMaticniBroj');
  await inputMaticniBroj.setValue('test');
  expect(inputMaticniBroj.element.value).toContain('test')
  await wrapper.find('form').trigger('submit.prevent');
  let errorMaticniBroj = await wrapper.find('.errorMaticniBroj');
  expect(errorMaticniBroj.text()).toBe("Polje moze sadrzati samo cifre");

})

test("test if input value maticniBroj lenght is 8", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if maticniBroj lenght is 8
  const inputMaticniBroj =  await wrapper.find('.inputMaticniBroj');
  await inputMaticniBroj.setValue('123456');
  await wrapper.find('form').trigger('submit.prevent');
  let errorMaticniBroj = await wrapper.find('.errorMaticniBroj');
  expect(errorMaticniBroj.text()).toBe("Polje mora imati 8 cifara");

  const inputMaticniBroj1 =  await wrapper.find('.inputMaticniBroj');
  await inputMaticniBroj1.setValue('123456789');
  await wrapper.find('form').trigger('submit.prevent');
  let errorMaticniBroj1 = await wrapper.find('.errorMaticniBroj');
  expect(errorMaticniBroj1.text()).toBe("Polje mora imati 8 cifara");

})

test("test if input value naziv is empty", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if naziv is empty
  const inputNaziv =  await wrapper.find('.inputNaziv');
  await inputNaziv.setValue('');
  await wrapper.find('form').trigger('submit.prevent');
  let errorNaziv = await wrapper.find('.errorNaziv');
  expect(errorNaziv.text()).toBe("Polje ne moze biti prazno");

})

test("test if input value naziv starts with capital letter", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if naziv is starts with capital letter
  const inputNaziv =  await wrapper.find('.inputNaziv');
  await inputNaziv.setValue('test');
  await wrapper.find('form').trigger('submit.prevent');
  let errorNaziv = await wrapper.find('.errorNaziv');
  expect(errorNaziv.text()).toBe("Polje mora pocinjati velikim slovom");

})

test("test if input value length is minimum 2 char", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if naziv length is minimum 2 char
  const inputNaziv =  await wrapper.find('.inputNaziv');
  await inputNaziv.setValue('T');
  await wrapper.find('form').trigger('submit.prevent');
  let errorNaziv = await wrapper.find('.errorNaziv');
  expect(errorNaziv.text()).toBe("Polje mora imati minimum 2 karaktera");

})

test("test if input value length is maximum 35 char", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(AddFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })

  const mestaArray = (await mockMestoArr).data;
  expect(mestaArray).toHaveLength(5);

  // test if naziv length is maximum 35 char
  const inputNaziv =  await wrapper.find('.inputNaziv');
  await inputNaziv.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper.find('form').trigger('submit.prevent');
  let errorNaziv = await wrapper.find('.errorNaziv');
  expect(errorNaziv.text()).toBe("Polje mora imati maksimum 35 karaktera");

})
