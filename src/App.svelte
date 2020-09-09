<script>
	import {db} from './firebase'

	let student = {
		name: '',
		lastName: '',
		address: '',
		gender: 'Hombre',
		dateOfBirth: '',
		tutor: '',
		relationship: '',
		phoneNumber: '',
		cellphoneNumer: '',
		tutorAddress: '',
		active: true,
	};
	let students = [];
	let editStatus = false;
	let currentId;
	
	db.collection('students').onSnapshot(querySnapshot => {
		let docs = [];
		querySnapshot.forEach(doc => {
			docs.push({...doc.data(), id: doc.id})
		})
		students = [...docs];
	})

	const addStudent = async () => {
		await db.collection('students').doc().set({
			...student, createAt: Date.now()
		});
		console.log("New student added");
	}

	
	const updateStudent = async () => {
		await db.collection('students').doc(currentId).update(student);
		editStatus = false;
	}

	const handleSubmit = (e) => {
		if (!editStatus) {
			addStudent();
		} else {
			updateStudent();
		}

		student = {
			name: '',
			lastName: '',
			address: '',
			gender: 'Hombre',
			dateOfBirth: '',
			tutor: '',
			relationship: '',
			phoneNumber: '',
			cellphoneNumer: '',
			tutorAddress: ''
		}
	}

	const deleteStudent = async (id) => {
		await db.collection('students').doc(id).delete();
	}

	const removeStudent = async (student) => {
		await db.collection('students').doc(student.id).set({...student, active:false, name:student.name})
	}

	const suscribeStudent = async (student) => {
		await db.collection('students').doc(student.id).set({...student, active:true, name:student.name})
	}

	const editStudent = (selectStudent) => {
		editStatus = true;
		student.name = selectStudent.name;
		student.lastName = selectStudent.lastName;
		student.address = selectStudent.address;
		student.gender = selectStudent.gender;
		student.dateOfBirth = selectStudent.dateOfBirth;
		student.tutorAddress = selectStudent.tutorAddress;
		student.tutor = selectStudent.tutor;
		student.relationship = selectStudent.relationship;
		student.phoneNumber = selectStudent.phoneNumber;
		student.cellphoneNumer = selectStudent.cellphoneNumer;
		student.active = selectStudent.active;
		currentId = selectStudent.id;
	}

	const onCancel = () => {
		editStatus = false;

		student = {
			name: '',
			lastName: '',
			address: '',
			gender: 'Hombre',
			dateOfBirth: '',
			tutor: '',
			relationship: '',
			phoneNumber: '',
			cellphoneNumer: '',
			tutorAddress: ''
		}
	}
</script>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container">
		<a class="navbar-brand" href="#">Navbar</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
	  <span class="navbar-toggler-icon"></span>
	</button>
  
	<div class="collapse navbar-collapse" id="navbarColor01">
	  <ul class="navbar-nav mr-auto">
		<li class="nav-item active">
		  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		</li>
		<li class="nav-item">
		  <a class="nav-link" href="#">Features</a>
		</li>
		<li class="nav-item">
		  <a class="nav-link" href="#">Pricing</a>
		</li>
		<li class="nav-item">
		  <a class="nav-link" href="#">About</a>
		</li>
		<li class="nav-item dropdown">
		  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
		  <div class="dropdown-menu">
			<a class="dropdown-item" href="#">Action</a>
			<a class="dropdown-item" href="#">Another action</a>
			<a class="dropdown-item" href="#">Something else here</a>
			<div class="dropdown-divider"></div>
			<a class="dropdown-item" href="#">Separated link</a>
		  </div>
		</li>
	  </ul>
	  <form class="form-inline my-2 my-lg-0">
		<input class="form-control mr-sm-2" type="text" placeholder="Search">
		<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
	  </form>
	</div>
	</div>
  </nav>

<div class="container">
	<div class="row">
		<div class="col-4 ">
			<form on:submit|preventDefault="{handleSubmit}" class="card card-body mt-2">
				<div class="form-group">
					<input 
						type="text" 
						placeholder="Nombre" 
						bind:value={student.name} 
						class="form-control">
	
				</div>
				<div class="form-group">
					<input type="text" placeholder="Apellidos" bind:value={student.lastName} class="form-control">
				</div>
				
				<div class="d-flex flex-row align-items-center">
					<div class="form-group p-1">
						<input type="date" placeholder="Fecha de nacimiento" bind:value={student.dateOfBirth} class="form-control">
					</div>
					<div class="form-group p-1">
						<div class="form-check">
							<input id="man" type="radio" value={'Hombre'} bind:group={student.gender} class="form-check-input">
							<label class="form-check-label" for="man">
								Hombre
							</label>
						</div>
						<div class="form-check">
							<input id="woman" type="radio" value={'Mujer'} bind:group={student.gender} class="form-check-input">
							<label class="form-check-label" for="woman">
								Mujer
							</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<input type="text" placeholder="Direccion" bind:value={student.address} class="form-control">
				</div>
			
				<div class="form-group">
					<input type="text" placeholder="Nombre completo del Apoderado" bind:value={student.tutor} class="form-control">
				</div>
				<div class="form-group">
					<input type="text" placeholder="Parentesco" bind:value={student.relationship} class="form-control">
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col">
							<input type="tel" placeholder="Telefono" bind:value={student.phoneNumber} class="form-control">
						</div>
						<div class="col">
							<input type="tel" placeholder="Celular" bind:value={student.cellphoneNumer} class="form-control">
						</div>
					</div>
				</div>
				<div class="form-group">
					<input type="text" placeholder="Direccion" bind:value={student.tutorAddress} class="form-control">
				</div>
			
				<div class="form-group">
					<div class="form-check">
						<input type="checkbox" bind:checked={student.active} class="form-check-input" id="exampleCheck1">
						<label class="form-check-label" for="exampleCheck1">Inscribir</label>
					</div>
				</div>
				
				<button class="btn btn-primary">
					{#if !editStatus}
						Guardar
					{:else}
						Actualizar
					{/if}
				</button>
				{#if editStatus}
					<button on:click={onCancel} class="btn btn-danger">Cancel</button>
				{/if}
			
			</form>
		</div>
		<div class="col-6">
			<div class="card mt-2">
				<div class="card-header">
				  Inscritos
				</div>
				<ul class="list-group list-group-flush">
					{#each students as student}
					{#if student.active}
						<li class="list-group-item">
							<div class="card-body">
								<div class="d-flex justify-content-between">
						
									<h5 class="card-title">{student.name}</h5>
									<button on:click={editStudent(student)} class="btn btn-info">
										<i class="material-icons" style="vertical-align:middle">edit</i>
									</button>
								</div>
								
								<p class="card-text">{student.dateOfBirth}</p>
								<button on:click={deleteStudent(student.id)} class="btn btn-danger">
									<i class="material-icons" style="vertical-align:middle">delete_forever</i>
								</button>
								<button on:click={removeStudent(student)} class="btn btn-info">
									<i class="material-icons" style="vertical-align:middle">remove_circle</i>
								</button>
							</div>
						</li>
					{/if}
					{/each}
				</ul>
			</div>
		</div>
		<div class="col-2">
			<div class="card mt-2" style="width: 18rem;">
				<div class="card-header">
				  Retiros
				</div>
				<ul class="list-group list-group-flush">
					{#each students as student}
					{#if !student.active}
						<li class="list-group-item">
							<div class="d-flex justify-content-between">
								<div class="d-flex flex-column">
									<p>{student.name}</p>
									<p>{student.lastName}</p>
								</div>
								<div class="d-flex flex-column align-items-center">
									<i on:click={deleteStudent(student.id)} class="tiny material-icons">clear</i>			
									<i on:click={suscribeStudent(student)} class="material-icons" style="vertical-align:middle">add_circle</i>
								</div>
								
							</div>
						</li>
					{/if}
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
	
<style>
	
</style>