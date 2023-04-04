import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import routes from "@/router/index.js" // This import should point to your routes file declared above
import Mesto from "@/views/Mesto.vue"
import UpdateMesto from "@/views/UpdateMesto.vue"
import axios from 'axios'
import { MestoService } from '@/services/MestoService'

const mockMestoArr = MestoService.getAllMesta()

jest.spyOn(axios, 'get').mockResolvedValue(mockMestoArr);

test('first test routing, then format input data', async () => {
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Mesto, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },

  })
  const mestaArray = (await mockMestoArr).data
  expect(mestaArray).toHaveLength(5)
  await wrapper.setData({mestoArr: mestaArray})
  expect(wrapper.html()).toContain('Izmeni')


  const mockOneMesto = MestoService.getMesto(11000)
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneMesto);
  // console.log((await mockOneMesto).data);
  await wrapper.findAll('.edit').at(1).trigger('click')
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/mesto/all',)
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/mesto/get/11000')

  const wrapper2 = mount(UpdateMesto,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })
  await wrapper2.setData({ 
    loading: false,
    mesto:{
      ptt: 11000,
      naziv: "Beograd",
      brojStanovnika: 1800000
   },
   errorMessage: null,
  })
//test if ptt is numerci
  const pttInput =  await wrapper2.find('.pttInput');
  await pttInput.setValue('ter');
  expect(pttInput.element.value).toContain('ter')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPtt = await wrapper2.find('.errorPtt');
  expect(errorPtt.text()).toBe("Polje moze sadrzati samo cifre");

//test if ptt is length 5
  const pttInput2 =  await wrapper2.find('.pttInput');
  await pttInput2.setValue('1234');
  expect(pttInput2.element.value).toContain('1234')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPtt2 = await wrapper2.find('.errorPtt');
  expect(errorPtt2.text()).toBe("Polje mora imati 5 cifara");

  //test if ptt is empty
  const pttInput3 =  await wrapper2.find('.pttInput');
  await pttInput3.setValue('');
  expect(pttInput3.element.value).toContain('')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPtt3 = await wrapper2.find('.errorPtt');
  expect(errorPtt3.text()).toBe("Polje ne moze biti prazno");


  //test if naziv is empty
  const nazivInput =  await wrapper2.find('.nazivInput');
  await nazivInput.setValue('');
  expect(nazivInput.element.value).toContain('')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv = await wrapper2.find('.errorNaziv');
  expect(errorNaziv.text()).toBe("Polje ne moze biti prazno");

  //test if naziv starts with capital letter
  const nazivInput1 =  await wrapper2.find('.nazivInput');
  await nazivInput1.setValue('test');
  expect(nazivInput1.element.value).toContain('test')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv1 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv1.text()).toBe("Polje mora pocinjati velikim slovom");

  //test if naziv is minimum length 2
  const nazivInput2 =  await wrapper2.find('.nazivInput');
  await nazivInput2.setValue('T');
  expect(nazivInput2.element.value).toContain('T')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv2 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv2.text()).toBe("Polje mora imati minimum 2 karaktera");

  //test if naziv is maximum length 35
  const nazivInput3 =  await wrapper2.find('.nazivInput');
  await nazivInput3.setValue('Lorem ipsum dolor sit amet consectetur');
  expect(nazivInput3.element.value).toContain('Lorem ipsum dolor sit amet consectetur')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorNaziv3 = await wrapper2.find('.errorNaziv');
  expect(errorNaziv3.text()).toBe("Polje mora imati maksimum 35 karaktera");

  //test if brojStanovnika is empty
  const brojStanovnikaInput =  await wrapper2.find('.brojStanovnikaInput');
  await brojStanovnikaInput.setValue('');
  expect(brojStanovnikaInput.element.value).toContain('')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorBrojStanovnika = await wrapper2.find('.errorBrojStanovnika');
  expect(errorBrojStanovnika.text()).toBe("Polje ne moze biti prazno");

  // test if brojStanovnika is numerci
  const brojStanovnikaInput1 =  await wrapper2.find('.brojStanovnikaInput');
  await brojStanovnikaInput1.setValue('test');
  expect(brojStanovnikaInput1.element.value).toContain('test')
  await wrapper2.find('form').trigger('submit.prevent');
  let errorBrojStanovnika1 = await wrapper2.find('.errorBrojStanovnika');
  expect(errorBrojStanovnika1.text()).toBe("Polje moze sadrzati samo cifre");

  //test if brojStanovnika is greater than zero
  const brojStanovnikaInput2 =  await wrapper2.find('.brojStanovnikaInput');
  await brojStanovnikaInput2.setValue(0);
  await wrapper2.find('form').trigger('submit.prevent');
  let errorBrojStanovnika2 = await wrapper2.find('.errorBrojStanovnika');
  expect(errorBrojStanovnika2.text()).toBe("Polje mora biti vece od nule");


})
