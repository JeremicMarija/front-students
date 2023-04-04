import { mount, flushPromises } from '@vue/test-utils'
import routes from "@/router/index.js" // This import should point to your routes file declared above
import Fakultet from "@/views/Fakultet.vue"
import UpdateFakultet from "@/views/UpdateFakultet.vue"
import axios from 'axios'
import { MestoService } from '@/services/MestoService'
import { FakultetService } from '@/services/FakultetService'

// const mockMestoArr = MestoService.getAllMesta()

// jest.spyOn(axios, 'get').mockResolvedValue(mockMestoArr);

const mockFakultetArr = FakultetService.getAllFakultet();

jest.spyOn(axios, 'get').mockResolvedValue(mockFakultetArr);

test("first test routing, then test validation of input maticniBroj", async () => {
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Fakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })
  const fakultetArray = (await mockFakultetArr).data;
  expect(fakultetArray).toHaveLength(4);
  await wrapper.setData({fakultetArr: fakultetArray});
  expect(wrapper.html()).toContain('Izmeni');


  const mockOneFakultet = FakultetService.getFakultet("07004044");
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneFakultet);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/fakultet/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/fakultet/get/07004044');

  const wrapper2 = mount(UpdateFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    fakultet:{
      maticniBroj: "07004044",
      naziv: "FON",
      mestoId: 11000
   },
   errorMessage: null,
  })

  // test if maticniBroj is empty
  const inputMaticniBroj =  await wrapper2.find('.inputMaticniBroj');
  await inputMaticniBroj.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorMaticniBroj = await wrapper2.find('.errorMaticniBroj');
  expect(errorMaticniBroj.text()).toBe("Polje ne moze biti prazno");

  // test if maticniBroj is numerci
  const inputMaticniBroj1 =  await wrapper2.find('.inputMaticniBroj');
  await inputMaticniBroj1.setValue('test');
  // expect(inputMaticniBroj1.element.value).toContain('test')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorMaticniBroj1 = await wrapper2.find('.errorMaticniBroj');
  expect(errorMaticniBroj1.text()).toBe("Polje moze sadrzati samo cifre");

  // test if maticniBroj lenght is 8
  const inputMaticniBroj2 =  await wrapper2.find('.inputMaticniBroj');
  await inputMaticniBroj2.setValue('123456');
  // expect(inputMaticniBroj2.element.value).toContain('test')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorMaticniBroj2 = await wrapper2.find('.errorMaticniBroj');
  expect(errorMaticniBroj2.text()).toBe("Polje mora imati 8 cifara");

  const inputMaticniBroj3 =  await wrapper2.find('.inputMaticniBroj');
  await inputMaticniBroj3.setValue('123456789');
  // expect(inputMaticniBroj2.element.value).toContain('test')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorMaticniBroj3 = await wrapper2.find('.errorMaticniBroj');
  expect(errorMaticniBroj3.text()).toBe("Polje mora imati 8 cifara");
})

test("first test routing, then test validation of input naziv", async () => {
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Fakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })
  const fakultetArray = (await mockFakultetArr).data;
  expect(fakultetArray).toHaveLength(4);
  await wrapper.setData({fakultetArr: fakultetArray});
  expect(wrapper.html()).toContain('Izmeni');


  const mockOneFakultet = FakultetService.getFakultet("07004044");
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneFakultet);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/fakultet/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/fakultet/get/07004044');

  const wrapper2 = mount(UpdateFakultet, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    fakultet:{
      maticniBroj: "07004044",
      naziv: "FON",
      mestoId: 11000
   },
   errorMessage: null,
  })

   // test if naziv is empty
   const inputNaziv =  await wrapper2.find('.inputNaziv');
   await inputNaziv.setValue('');
   await wrapper2.find('form').trigger('submit.prevent');
   let errorNaziv = await wrapper2.find('.errorNaziv');
   expect(errorNaziv.text()).toBe("Polje ne moze biti prazno");

  // test if naziv starts with capital letter
  const inputNaziv1 =  await wrapper2.find('.inputNaziv');
  await inputNaziv1.setValue('test');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv1 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv1.text()).toBe("Polje mora pocinjati velikim slovom");

  // test if naziv length is minimum 2 char
  const inputNaziv2 =  await wrapper2.find('.inputNaziv');
  await inputNaziv2.setValue('T');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv2 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv2.text()).toBe("Polje mora imati minimum 2 karaktera");

  // test if naziv length is maximum 35 char
  const inputNaziv3 =  await wrapper2.find('.inputNaziv');
  await inputNaziv3.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv3 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv3.text()).toBe("Polje mora imati maksimum 35 karaktera");

})