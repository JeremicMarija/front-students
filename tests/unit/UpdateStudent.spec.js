import { mount, flushPromises } from '@vue/test-utils'
import routes from "@/router/index.js" // This import should point to your routes file declared above
import Student from "@/views/Student.vue"
import UpdateStudent from "@/views/UpdateStudent.vue"
import axios from 'axios'
import { StudentService } from '@/services/StudentService'

const mockStudentArr = StudentService.getAllStudent();
jest.spyOn(axios, 'get').mockResolvedValue(mockStudentArr);

test("first test routing, then test validation of input BROJ INDEKSA", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Student, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  const studentArray = (await mockStudentArr).data;
  expect(studentArray).toHaveLength(3);
  await wrapper.setData({studentArr: studentArray});
  expect(wrapper.html()).toContain('Izmeni');

  const mockOneStudent = StudentService.getStudent("21-3720")
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneStudent);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/student/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/student/get/21-3720');

  const wrapper2 = mount(UpdateStudent,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    student:{
      brojIndeksa: "21/3720",
      ime: "Marija",
      prezime: "Jeremic",
      datumRodjenja: '1990-05-31',
      jmbg: '3105990766026',
      fakultetIds: [
        "07004044",
        "07032587"
      ],
   },
   errorMessage: null,
  })

  // test if BROJ INDEKSA is empty
  const inputBrojIndeksa =  await wrapper2.find('.inputBrojIndeksa');
  await inputBrojIndeksa.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorBrojIndeksa = await wrapper2.find('.errorBrojIndeksa');
  expect(errorBrojIndeksa.text()).toBe("Polje ne moze biti prazno");

  // test if BROJ INDEKSA has incorrect format
  const inputBrojIndeksa1 =  await wrapper2.find('.inputBrojIndeksa');
  await inputBrojIndeksa1.setValue('123');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorBrojIndeksa1 = await wrapper2.find('.errorBrojIndeksa');
  expect(errorBrojIndeksa1.text()).toBe("Broj indeksa mora biti u formatu 21/3720, prve dve cifre za godinu i maksimalno 4 cifre za redni broj");
})

test("first test routing, then test validation of input IME", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Student, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  const studentArray = (await mockStudentArr).data;
  expect(studentArray).toHaveLength(3);
  await wrapper.setData({studentArr: studentArray});
  expect(wrapper.html()).toContain('Izmeni');

  const mockOneStudent = StudentService.getStudent("21-3720")
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneStudent);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/student/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/student/get/21-3720');

  const wrapper2 = mount(UpdateStudent,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    student:{
      brojIndeksa: "21/3720",
      ime: "Marija",
      prezime: "Jeremic",
      datumRodjenja: '1990-05-31',
      jmbg: '3105990766026',
      fakultetIds: [
        "07004044",
        "07032587"
      ],
   },
   errorMessage: null,
  })

  // test if IME is empty
  const inputIme =  await wrapper2.find('.inputIme');
  await inputIme.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorIme = await wrapper2.find('.errorIme');
  expect(errorIme.text()).toBe("Polje ne moze biti prazno");

  // test if IME starts with capital letter
  const inputIme1 =  await wrapper2.find('.inputIme');
  await inputIme1.setValue('test');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorIme1 = await wrapper2.find('.errorIme');
  expect(errorIme1.text()).toBe("Polje mora pocinjati velikim slovom");

  // test if IME has min length of 2
  const inputIme2 =  await wrapper2.find('.inputIme');
  await inputIme2.setValue('T');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorIme2 = await wrapper2.find('.errorIme');
  expect(errorIme2.text()).toBe("Polje mora imati minimum 2 karaktera");
  
  // test if IME has max length of 35
  const inputIme3 =  await wrapper2.find('.inputIme');
  await inputIme3.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorIme3 = await wrapper2.find('.errorIme');
  expect(errorIme3.text()).toBe("Polje mora imati maksimum 35 karaktera");
})


test("first test routing, then test validation of input PREZIME", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Student, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  const studentArray = (await mockStudentArr).data;
  expect(studentArray).toHaveLength(3);
  await wrapper.setData({studentArr: studentArray});
  expect(wrapper.html()).toContain('Izmeni');

  const mockOneStudent = StudentService.getStudent("21-3720")
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneStudent);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/student/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/student/get/21-3720');

  const wrapper2 = mount(UpdateStudent,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    student:{
      brojIndeksa: "21/3720",
      ime: "Marija",
      prezime: "Jeremic",
      datumRodjenja: '1990-05-31',
      jmbg: '3105990766026',
      fakultetIds: [
        "07004044",
        "07032587"
      ],
   },
   errorMessage: null,
  })

  // test if PREZIME is empty
  const inputPrezime =  await wrapper2.find('.inputPrezime');
  await inputPrezime.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPrezime = await wrapper2.find('.errorPrezime');
  expect(errorPrezime.text()).toBe("Polje ne moze biti prazno");

  // test if PREZIME starts with capital letter
  const inputPrezime1 =  await wrapper2.find('.inputPrezime');
  await inputPrezime1.setValue('test');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPrezime1 = await wrapper2.find('.errorPrezime');
  expect(errorPrezime1.text()).toBe("Polje mora pocinjati velikim slovom");

  // test if PREZIME has min length of 2
  const inputPrezime2 =  await wrapper2.find('.inputPrezime');
  await inputPrezime2.setValue('T');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPrezime2 = await wrapper2.find('.errorPrezime');
  expect(errorPrezime2.text()).toBe("Polje mora imati minimum 2 karaktera");
  
  // test if PREZIME has max length of 35
  const inputPrezime3 =  await wrapper2.find('.inputPrezime');
  await inputPrezime3.setValue('Lorem ipsum dolor sit amet consectetur');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorPrezime3 = await wrapper2.find('.errorPrezime');
  expect(errorPrezime3.text()).toBe("Polje mora imati maksimum 35 karaktera");
})

test("first test routing, then test validation of input DATUM RODJENJA", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Student, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  const studentArray = (await mockStudentArr).data;
  expect(studentArray).toHaveLength(3);
  await wrapper.setData({studentArr: studentArray});
  expect(wrapper.html()).toContain('Izmeni');

  const mockOneStudent = StudentService.getStudent("21-3720")
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneStudent);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/student/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/student/get/21-3720');

  const wrapper2 = mount(UpdateStudent,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    student:{
      brojIndeksa: "21/3720",
      ime: "Marija",
      prezime: "Jeremic",
      datumRodjenja: '1990-05-31',
      jmbg: '3105990766026',
      fakultetIds: [
        "07004044",
        "07032587"
      ],
   },
   errorMessage: null,
  })

  // test if DATUM RODJENJA is empty
  const inputDatumRodjenja =  await wrapper2.find('.inputDatumRodjenja');
  await inputDatumRodjenja.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorDatumRodjenja = await wrapper2.find('.errorDatumRodjenja');
  expect(errorDatumRodjenja.text()).toBe("Polje ne moze biti prazno");

})


test("first test routing, then test validation of input JMBG", async () =>{
  routes.push('/')
  // After this line, router is ready
  await routes.isReady()
  const wrapper = mount(Student, {
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  const studentArray = (await mockStudentArr).data;
  expect(studentArray).toHaveLength(3);
  await wrapper.setData({studentArr: studentArray});
  expect(wrapper.html()).toContain('Izmeni');

  const mockOneStudent = StudentService.getStudent("21-3720")
  jest.spyOn(axios, 'get').mockResolvedValue(mockOneStudent);
  await wrapper.findAll('.edit').at(1).trigger('click');
  expect(axios.get).toHaveBeenNthCalledWith(1,'http://localhost:8080/api/student/all',);
  expect(axios.get).toHaveBeenNthCalledWith(2,'http://localhost:8080/api/student/get/21-3720');

  const wrapper2 = mount(UpdateStudent,{
    global: {
      // plugins: [router]
      plugins: [routes]
    },
  })

  await wrapper2.setData({ 
    loading: false,
    student:{
      brojIndeksa: "21/3720",
      ime: "Marija",
      prezime: "Jeremic",
      datumRodjenja: '1990-05-31',
      jmbg: '3105990766026',
      fakultetIds: [
        "07004044",
        "07032587"
      ],
   },
   errorMessage: null,
  })

  // test if JMBG is empty
  const inputJMBG =  await wrapper2.find('.inputJMBG');
  await inputJMBG.setValue('');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorJMBG = await wrapper2.find('.errorJMBG');
  expect(errorJMBG.text()).toBe("Polje ne moze biti prazno");

  // test if JMBG is numeric
  const inputJMBG1 =  await wrapper2.find('.inputJMBG');
  await inputJMBG1.setValue('test');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorJMBG1 = await wrapper2.find('.errorJMBG');
  expect(errorJMBG1.text()).toBe("Polje moze sadrzati samo cifre");

  // test if JMBG has 13 numbers
  const inputJMBG2 =  await wrapper2.find('.inputJMBG');
  await inputJMBG2.setValue('123456789');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorJMBG2 = await wrapper2.find('.errorJMBG');
  expect(errorJMBG2.text()).toBe("Polje mora imati 13 cifara");

  const inputJMBG3 =  await wrapper2.find('.inputJMBG');
  await inputJMBG3.setValue('12345678912345');
  await wrapper2.find('form').trigger('submit.prevent');
  let errorJMBG3 = await wrapper2.find('.errorJMBG');
  expect(errorJMBG3.text()).toBe("Polje mora imati 13 cifara");

})