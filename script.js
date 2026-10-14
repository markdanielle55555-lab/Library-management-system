/* ==========================================
   LIBRARY MANAGEMENT SYSTEM
========================================== */

"use strict";

/* ===============================
      DATA STORAGE
================================ */

const STORAGE_KEYS = {
    books: "books",
    members: "members",
    borrowings: "borrowings",
    fines: "fines",
    digitalAssets: "digitalAssets",
    currentStudent: "currentStudent"
};

function loadData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

let books = loadData(STORAGE_KEYS.books);
let members = loadData(STORAGE_KEYS.members);
let borrowings = loadData(STORAGE_KEYS.borrowings);
let fines = loadData(STORAGE_KEYS.fines);
let digitalAssets = loadData(STORAGE_KEYS.digitalAssets);

let pendingStudent = null;
let currentStudent = null;
let selectedReturnBorrowing = null;

/* ===============================
      HELPER FUNCTIONS
================================ */

function saveData() {
    localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
    localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(members));
    localStorage.setItem(STORAGE_KEYS.borrowings, JSON.stringify(borrowings));
    localStorage.setItem(STORAGE_KEYS.fines, JSON.stringify(fines));
    localStorage.setItem(STORAGE_KEYS.digitalAssets, JSON.stringify(digitalAssets));
}

/* ==========================================
   IMPORT 50 ENGINEERING BOOKS
========================================== */

const engineeringBooks = [
    ["Engineering Mechanics: Statics", "J. L. Meriam & L. G. Kraige", "9780073398235", 2012, "Mechanical Engineering"],
    ["Engineering Mechanics: Dynamics", "J. L. Meriam & L. G. Kraige", "9780073398204", 2012, "Mechanical Engineering"],
    ["Shigley's Mechanical Engineering Design", "Richard G. Budynas & J. Keith Nisbett", "9780073398204", 2014, "Mechanical Engineering"],
    ["Fundamentals of Thermodynamics", "Richard E. Sonntag et al.", "9781119391388", 2018, "Mechanical Engineering"],
    ["Fluid Mechanics", "Frank M. White", "9780073398273", 2011, "Mechanical Engineering"],
    ["Heat Transfer", "J. P. Holman", "9780073529363", 2010, "Mechanical Engineering"],
    ["Machine Design", "Robert L. Norton", "9780133356717", 2013, "Mechanical Engineering"],
    ["Materials Science and Engineering", "William D. Callister Jr.", "9781119405498", 2018, "Materials Engineering"],
    ["Manufacturing Engineering and Technology", "Serope Kalpakjian & Steven R. Schmid", "9780133128741", 2014, "Manufacturing Engineering"],
    ["Engineering Materials 1", "Michael F. Ashby & David R. H. Jones", "9780080966687", 2013, "Materials Engineering"],
    ["Structural Analysis", "Russell C. Hibbeler", "9780134610672", 2017, "Civil Engineering"],
    ["Engineering Fluid Mechanics", "Clayton T. Crowe et al.", "9781119723548", 2020, "Mechanical Engineering"],
    ["Design of Reinforced Concrete", "Jack C. McCormac & Russell H. Brown", "9781119320792", 2015, "Civil Engineering"],
    ["Reinforced Concrete Design", "S. Unnikrishna Pillai & Devdas Menon", "9780133485967", 2015, "Civil Engineering"],
    ["Foundation Design", "Donald P. Coduto", "9780132132914", 2008, "Civil Engineering"],
    ["Principles of Highway Engineering and Traffic Analysis", "Fred L. Mannering et al.", "9781119493961", 2020, "Civil Engineering"],
    ["Surveying", "B. C. Punmia et al.", "9780134604657", 2016, "Civil Engineering"],
    ["Environmental Engineering", "Gerard Kiely", "9780073401180", 2009, "Environmental Engineering"],
    ["Water Supply and Sewerage", "Terence J. McGhee", "9780070609388", 1991, "Civil Engineering"],
    ["Steel Structures", "Ram Chandra", "9780074516454", 2014, "Civil Engineering"],
    ["Microelectronic Circuits", "Adel S. Sedra & Kenneth C. Smith", "9780190853464", 2019, "Electrical Engineering"],
    ["Fundamentals of Microelectronics", "Behzad Razavi", "9781118156322", 2013, "Electrical Engineering"],
    ["Electronic Devices and Circuit Theory", "Robert L. Boylestad & Louis Nashelsky", "9780132622264", 2013, "Electrical Engineering"],
    ["Digital Design", "M. Morris Mano & Michael D. Ciletti", "9780132774208", 2012, "Computer Engineering"],
    ["Digital Logic Design", "Alan B. Marcovitz", "9780471364912", 2005, "Computer Engineering"],
    ["Digital Systems: Principles and Applications", "Ronald J. Tocci et al.", "9780134529657", 2017, "Computer Engineering"],
    ["Electronic Communication Systems", "Kennedy & Davis", "9780070667504", 2001, "Electrical Engineering"],
    ["Communication Systems", "Simon Haykin", "9780471697909", 2008, "Electrical Engineering"],
    ["RF Circuit Design", "Christopher Bowick", "9780750675188", 2003, "Electrical Engineering"],
    ["Power Electronics", "Muhammad H. Rashid", "9780133125900", 2014, "Electrical Engineering"],
    ["Electrical Machinery Fundamentals", "Stephen J. Chapman", "9780073529547", 2011, "Electrical Engineering"],
    ["Electric Machinery", "A. E. Fitzgerald et al.", "9780073380469", 2009, "Electrical Engineering"],
    ["Power System Analysis", "John J. Grainger & William D. Stevenson Jr.", "9780070612938", 1994, "Electrical Engineering"],
    ["Power System Engineering", "K. R. Padiyar", "9788120335618", 2006, "Electrical Engineering"],
    ["Electrical Engineering: Principles and Applications", "Allan R. Hambley", "9780133116649", 2014, "Electrical Engineering"],
    ["Engineering Circuit Analysis", "William H. Hayt Jr. et al.", "9780073380575", 2011, "Electrical Engineering"],
    ["Signals and Systems", "Alan V. Oppenheim et al.", "9780138147570", 1996, "Electrical Engineering"],
    ["Control Systems Engineering", "Norman S. Nise", "9781118170519", 2014, "Control Engineering"],
    ["Modern Control Engineering", "Katsuhiko Ogata", "9780136156734", 2010, "Control Engineering"],
    ["Automatic Control Systems", "Benjamin C. Kuo & Farid Golnaraghi", "9780470048962", 2009, "Control Engineering"],
    ["Introduction to Algorithms", "Thomas H. Cormen et al.", "9780262046305", 2022, "Computer Engineering"],
    ["Computer Organization and Design", "David A. Patterson & John L. Hennessy", "9780128201091", 2020, "Computer Engineering"],
    ["Computer Architecture", "John L. Hennessy & David A. Patterson", "9780128119051", 2019, "Computer Engineering"],
    ["Digital Computer Electronics", "Albert Paul Malvino", "9780071005965", 1992, "Computer Engineering"],
    ["The Art of Electronics", "Paul Horowitz & Winfield Hill", "9780521809269", 2015, "Electrical Engineering"],
    ["Engineering Economy", "William G. Sullivan et al.", "9780073376301", 2014, "Engineering Management"],
    ["Engineering Economic Analysis", "Donald G. Newman et al.", "9780199339274", 2016, "Engineering Management"],
    ["Project Management for Engineering and Construction", "Garold D. Oberlender", "9780071822314", 2014, "Engineering Management"],
    ["Engineering Ethics", "Charles B. Fleddermann", "9781107182000", 2017, "Engineering Ethics"],
    ["Introduction to Engineering", "Paul H. Wright", "9780073397948", 2013, "General Engineering"]
];

function seedEngineeringBooks() {
    const existingTitles = new Set(
        books.map(book => String(book.title || "").toLowerCase())
    );

    engineeringBooks.forEach(([title, author, isbn, year, category]) => {
        if (existingTitles.has(title.toLowerCase())) return;

        books.push({
            id: makeId("BK", books),
            title: title,
            author: author,
            isbn: isbn,
            publicationYear: year,
            category: category,
            copies: 1,
            availableCopies: 1,
            status: "Available",
            dateAdded: formatDate()
        });

        existingTitles.add(title.toLowerCase());
    });

    saveData();
}
seedEngineeringBooks();

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function makeId(prefix, list) {
    let number = list.length + 1;
    let id = prefix + String(number).padStart(4, "0");

    while (list.some(item => item.id === id)) {
        number++;
        id = prefix + String(number).padStart(4, "0");
    }

    return id;
}

function formatDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatMoney(amount) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP"
    }).format(amount);
}

function setMessage(elementId, message, success = false) {
    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = message;
    element.style.color = success ? "#15803d" : "#dc2626";
}

function ensureTableBody(table) {
    if (!table) return null;

    let tbody = table.querySelector("tbody");

    if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    return tbody;
}

function statusBadge(status) {
    const classes = {
        Available: "success",
        Borrowed: "warning",
        Returned: "success",
        Overdue: "danger",
        Active: "success",
        Paid: "success",
        Unpaid: "danger",
        Reserved: "info"
    };

    const className = classes[status] || "info";

    return `<span class="badge ${className}">${escapeHTML(status)}</span>`;
}

/* ===============================
      LOGIN AND DEMO VERIFICATION
================================ */

const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const verificationForm = document.getElementById("verificationForm");

function showLogin() {
    if (loginPage) loginPage.hidden = false;
    if (verificationForm) verificationForm.hidden = true;

    document.getElementById("sidebar")?.setAttribute("hidden", "");
    document.querySelector(".main")?.setAttribute("hidden", "");
}

function showVerification() {
    if (loginPage) loginPage.hidden = true;
    if (verificationForm) verificationForm.hidden = false;

    const email = pendingStudent?.email || "";

    const message = document.getElementById("verificationMessage");

    if (message) {
        message.textContent =
            `Demo verification for ${email}. Enter the 6-digit code shown below.`;
    }
}

function generateDemoCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function startVerification() {
    pendingStudent.verificationCode = generateDemoCode();

    // DEMO ONLY:
    // A real application must send this code using a backend
    // and an email provider. Never expose production OTPs here.
    setMessage(
        "otpStatus",
        `DEMO CODE: ${pendingStudent.verificationCode}`,
        true
    );

    showVerification();
}

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const student = {
            name: document.getElementById("studentName").value.trim(),
            email: document.getElementById("studentEmail").value.trim(),
            studentId: document.getElementById("studentId").value.trim(),
            course: document.getElementById("course").value.trim(),
            yearLevel: document.getElementById("yearLevel").value
        };

        if (
            !student.name ||
            !student.email ||
            !student.studentId ||
            !student.course ||
            !student.yearLevel
        ) {
            alert("Please complete all student information.");
            return;
        }

        pendingStudent = student;
        startVerification();
    });
}

verificationForm?.addEventListener("submit", event => {
    event.preventDefault();

    const enteredCode =
        document.getElementById("verificationCode").value.trim();

    if (!pendingStudent || enteredCode !== pendingStudent.verificationCode) {
        setMessage("otpStatus", "Incorrect code. Please try again.");
        return;
    }

    currentStudent = {
        name: pendingStudent.name,
        email: pendingStudent.email,
        studentId: pendingStudent.studentId,
        course: pendingStudent.course,
        yearLevel: pendingStudent.yearLevel
    };

    localStorage.setItem(
        STORAGE_KEYS.currentStudent,
        JSON.stringify(currentStudent)
    );



    if (loginPage) loginPage.hidden = true;
    if (verificationForm) verificationForm.hidden = true;

    document.getElementById("sidebar")?.removeAttribute("hidden");
    document.querySelector(".main")?.removeAttribute("hidden");

    document.getElementById("pageSubtitle").textContent =
        `Welcome, ${currentStudent.name}`;

    const userArea = document.querySelector(".user-area .user strong");

    if (userArea) userArea.textContent = currentStudent.name;

    pendingStudent = null;

    refreshAll();
    showPage("dashboard");
});

document.getElementById("resendCodeBtn")?.addEventListener("click", () => {
    if (!pendingStudent) {
        setMessage("otpStatus", "Please enter your student details first.");
        return;
    }

    startVerification();
});

document.getElementById("backToLoginBtn")?.addEventListener("click", () => {
    pendingStudent = null;
    verificationForm.reset();
    setMessage("otpStatus", "");
    showLogin();
});

// Hide the library until the student logs in.
if (!localStorage.getItem(STORAGE_KEYS.currentStudent)) {
    showLogin();
} else {
    try {
        currentStudent = JSON.parse(
            localStorage.getItem(STORAGE_KEYS.currentStudent)
        );

        loginPage.hidden = true;
        verificationForm.hidden = true;

        document.getElementById("sidebar")?.removeAttribute("hidden");
        document.querySelector(".main")?.removeAttribute("hidden");

        const userArea = document.querySelector(".user-area .user strong");

        if (userArea) {
            userArea.textContent = currentStudent.name;
        }

        document.getElementById("pageSubtitle").textContent =
            `Welcome, ${currentStudent.name}`;
    } catch {
        localStorage.removeItem(STORAGE_KEYS.currentStudent);
        showLogin();
    }
}

/* ===============================
      PAGE NAVIGATION
================================ */

const pageInformation = {
    dashboard: ["Dashboard", "Library overview and activities"],
    books: ["Books", "Manage physical library books"],
    members: ["Members", "Manage registered members"],
    borrow: ["Borrowing Records", "Track loans and due dates"],
    borrowings: ["Borrowing Records", "Track loans and due dates"],
    return: ["Return Books", "Process book returns"],
    digital: ["Digital Assets", "Manage digital library resources"],
    fines: ["Fines & Payments", "Manage overdue fines and payments"]
};

function showPage(pageId) {
    // The navigation says "borrow", but the section ID is "borrowings".
    if (pageId === "borrow") pageId = "borrowings";

    const target = document.getElementById(pageId);

    if (!target || !target.classList.contains("page")) return;

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    target.classList.add("active-page");

    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPage = link.dataset.page === "borrow"
            ? "borrowings"
            : link.dataset.page;

        link.classList.toggle("active", linkPage === pageId);
    });

    const information = pageInformation[pageId];

    document.getElementById("pageTitle").textContent = information[0];
    document.getElementById("pageSubtitle").textContent = information[1];

    document.getElementById("sidebar")?.classList.remove("open");
}

window.showPage = showPage;

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("open");
});

/* ===============================
      MODAL CONTROLS
================================ */

function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.remove("show");
    }
}

window.openModal = openModal;
window.closeModal = closeModal;

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach(modal => {
            modal.classList.remove("show");
        });
    }
});

/* ===============================
      ADD, EDIT AND DELETE BOOKS
================================ */

const addBookForm = document.getElementById("addBookForm");

addBookForm?.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const category = document.getElementById("bookCategory").value;
    const copies = Number(document.getElementById("bookCopies").value);

    if (!title || !author || !Number.isInteger(copies) || copies < 1) {
        alert("Enter a valid title, author, and number of copies.");
        return;
    }

    const book = {
        id: makeId("BK", books),
        title,
        author,
        category,
        copies,
        availableCopies: copies,
        status: "Available",
        dateAdded: formatDate()
    };

    books.push(book);

    saveData();
    refreshAll();

    addBookForm.reset();
    document.getElementById("bookCopies").value = 1;

    closeModal("addBookModal");

    alert(`"${title}" was added successfully.`);
});

function getBookStatus(book) {
    if (book.availableCopies <= 0) return "Borrowed";
    return "Available";
}

function renderBooks(list = books) {
    const table = document.getElementById("booksTable");
    const tbody = ensureTableBody(table);

    if (!tbody) return;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">No books found.</td>
            </tr>`;
        return;
    }

    tbody.innerHTML = list.map(book => `
        <tr>
            <td>${escapeHTML(book.id)}</td>
            <td><strong>${escapeHTML(book.title)}</strong></td>
            <td>${escapeHTML(book.author)}</td>
            <td>${escapeHTML(book.category)}</td>
            <td>${book.availableCopies} / ${book.copies}</td>
            <td>${statusBadge(getBookStatus(book))}</td>
            <td>
                <button class="action-btn"
                    data-book-action="edit"
                    data-id="${escapeHTML(book.id)}"
                    title="Edit book">Edit</button>
                <button class="action-btn"
                    data-book-action="delete"
                    data-id="${escapeHTML(book.id)}"
                    title="Delete book">Delete</button>
            </td>
        </tr>
    `).join("");
}

function searchBooks() {
    const searchTerm =
        document.getElementById("bookSearch").value.toLowerCase().trim();

    const filteredBooks = books.filter(book =>
        [book.id, book.title, book.author, book.category]
            .some(value => String(value).toLowerCase().includes(searchTerm))
    );

    renderBooks(filteredBooks);
}

window.searchBooks = searchBooks;

document.getElementById("booksTable")?.addEventListener("click", event => {
    const button = event.target.closest("button[data-book-action]");

    if (!button) return;

    const book = books.find(item => item.id === button.dataset.id);

    if (!book) return;

    if (button.dataset.bookAction === "edit") {
        const title = prompt("Book title:", book.title);
        if (title === null) return;

        const author = prompt("Author:", book.author);
        if (author === null) return;

        const category = prompt("Category:", book.category);
        if (category === null) return;

        const copiesText = prompt(
            "Total copies (cannot be less than borrowed copies):",
            String(book.copies)
        );

        if (copiesText === null) return;

        const newCopies = Number(copiesText);
        const borrowedCount = book.copies - book.availableCopies;

        if (
            !title.trim() ||
            !author.trim() ||
            !category.trim() ||
            !Number.isInteger(newCopies) ||
            newCopies < 1 ||
            newCopies < borrowedCount
        ) {
            alert("Invalid information or too few copies for existing loans.");
            return;
        }

        book.title = title.trim();
        book.author = author.trim();
        book.category = category.trim();
        book.copies = newCopies;
        book.availableCopies = newCopies - borrowedCount;

        saveData();
        refreshAll();
    }

    if (button.dataset.bookAction === "delete") {
        const hasActiveLoans = borrowings.some(item =>
            item.bookId === book.id && item.status !== "Returned"
        );

        if (hasActiveLoans) {
            alert("This book has active loans and cannot be deleted.");
            return;
        }

        if (confirm(`Delete "${book.title}"?`)) {
            books = books.filter(item => item.id !== book.id);
            saveData();
            refreshAll();
        }
    }
});

/* ===============================
      MEMBERS
================================ */



function renderMembers() {
    const table = document.querySelector("#members table");
    const tbody = ensureTableBody(table);

    if (!tbody) return;

    if (members.length === 0) {
        tbody.innerHTML =
            `<tr><td colspan="7">No registered members.</td></tr>`;
        return;
    }

    tbody.innerHTML = members.map(member => `
        <tr>
            <td>${escapeHTML(member.id)}</td>
            <td><strong>${escapeHTML(member.name)}</strong></td>
            <td>${escapeHTML(member.email)}</td>
            <td>${escapeHTML(member.membership || "Student")}</td>
            <td>${escapeHTML(member.joined || "")}</td>
            <td>${statusBadge(member.status || "Active")}</td>
            <td>
                <button
                    type="button"
                    class="remove-member-btn"
                    data-remove-member="${escapeHTML(member.id)}">
                    Remove
                </button>
            </td>
        </tr>
    `).join("");
}

// Handle Remove button clicks
document.querySelector("#members table")?.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-member]");

    if (!button) return;

    const memberId = button.dataset.removeMember;
    const member = members.find(item => item.id === memberId);

    if (!member) return;

    // Prevent deletion if the member has an active borrowing.
    const hasActiveBorrowing = borrowings.some(item =>
        item.memberId === member.id &&
        item.status !== "Returned"
    );

    if (hasActiveBorrowing) {
        alert("This member has an active borrowing. Return the book before removing this member.");
        return;
    }

    // Prevent deletion if the member has unpaid fines.
    const hasUnpaidFine = fines.some(item =>
        item.memberId === member.id &&
        item.status !== "Paid"
    );

    if (hasUnpaidFine) {
        alert("This member has unpaid fines. Record payment before removing this member.");
        return;
    }

    if (!confirm(`Are you sure you want to remove ${member.name}?`)) {
        return;
    }

    members = members.filter(item => item.id !== memberId);

    saveData();
    refreshAll();

    alert("Member removed successfully.");
});


// Handle Remove button clicks
document.querySelector("#members table")?.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-member]");

    if (!button) return;

    const memberId = button.dataset.removeMember;
    const member = members.find(item => item.id === memberId);

    if (!member) return;

    // Prevent deletion if the member has an active borrowing.
    const hasActiveBorrowing = borrowings.some(item =>
        item.memberId === member.id &&
        item.status !== "Returned"
    );

    if (hasActiveBorrowing) {
        alert("This member has an active borrowing. Return the book before removing this member.");
        return;
    }

    // Prevent deletion if the member has unpaid fines.
    const hasUnpaidFine = fines.some(item =>
        item.memberId === member.id &&
        item.status !== "Paid"
    );

    if (hasUnpaidFine) {
        alert("This member has unpaid fines. Record payment before removing this member.");
        return;
    }

    if (!confirm(`Are you sure you want to remove ${member.name}?`)) {
        return;
    }

    members = members.filter(item => item.id !== memberId);

    saveData();
    refreshAll();

    alert("Member removed successfully.");
});

const memberAddButton =
    document.querySelector("#members .section-header .primary-btn");

memberAddButton?.addEventListener("click", () => {
    const name = prompt("Member full name:");
    if (name === null || !name.trim()) return;

    const email = prompt("Member email:");
    if (email === null || !email.trim()) return;

    const studentId = prompt("Student ID:");
    if (studentId === null || !studentId.trim()) return;

    if (members.some(member =>
        member.studentId.toLowerCase() === studentId.trim().toLowerCase()
    )) {
        alert("A member with this Student ID already exists.");
        return;
    }

    members.push({
        id: makeId("MB", members),
        name: name.trim(),
        email: email.trim(),
        studentId: studentId.trim(),
        membership: "Student",
        joined: formatDate(),
        status: "Active"
    });

    saveData();
    refreshAll();
    alert("Member registered successfully.");
});

/* ===============================
      BORROW BOOKS
================================ */


// This button opens a simple prompt-based borrowing workflow.

const borrowAddButton =
    document.querySelector("#borrowings .section-header .primary-btn");

borrowAddButton?.addEventListener("click", () => {
    const studentId = prompt("Enter the member's Student ID:");
    if (studentId === null || !studentId.trim()) return;

    const member = members.find(item =>
        item.studentId.toLowerCase() === studentId.trim().toLowerCase()
    );

    if (!member) {
        alert("Member not found. Register the member first.");
        return;
    }

    const bookId = prompt("Enter the Book ID (for example, BK0001):");
    if (bookId === null || !bookId.trim()) return;

    const book = books.find(item =>
        item.id.toLowerCase() === bookId.trim().toLowerCase()
    );

    if (!book) {
        alert("Book not found.");
        return;
    }

    if (book.availableCopies <= 0) {
        alert("No copies of this book are currently available.");
        return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    borrowings.push({
        id: makeId("BR", borrowings),
        memberId: member.id,
        studentId: member.studentId,
        memberName: member.name,
        bookId: book.id,
        bookTitle: book.title,
        borrowDate: formatDate(),
        dueDate: formatDate(dueDate),
        returnDate: null,
        status: "Borrowed"
    });

    book.availableCopies--;

    saveData();
    refreshAll();

    alert(`${book.title} borrowed successfully. Due date: ${formatDate(dueDate)}`);
});

function renderBorrowings() {
    const table = document.querySelector("#borrowings table");
    const tbody = ensureTableBody(table);

    if (!tbody) return;

    if (!borrowings.length) {
        tbody.innerHTML = `<tr><td colspan="7">No borrowing records.</td></tr>`;
        return;
    }

    // Update overdue statuses and create missing fine records.
    updateOverdueFines();

    tbody.innerHTML = borrowings.map(item => `
        <tr>
            <td>${escapeHTML(item.id)}</td>
            <td>${escapeHTML(item.memberName)}</td>
            <td>${escapeHTML(item.bookTitle)}</td>
            <td>${escapeHTML(item.borrowDate)}</td>
            <td>${escapeHTML(item.dueDate)}</td>
            <td>${statusBadge(item.status)}</td>
            <td>
                ${item.status !== "Returned"
                    ? `<button class="action-btn"
                        data-borrow-return="${escapeHTML(item.id)}">
                        Return
                       </button>`
                    : "Completed"}
            </td>
        </tr>
    `).join("");
}

document.querySelector("#borrowings table")?.addEventListener("click", event => {
    const button = event.target.closest("[data-borrow-return]");
    if (!button) return;

    const borrowing = borrowings.find(
        item => item.id === button.dataset.borrowReturn
    );

    if (!borrowing) return;

    document.getElementById("returnStudentId").value = borrowing.studentId;
    document.getElementById("returnBookId").value = borrowing.bookId;

    showPage("return");
    document.getElementById("returnSearchForm").requestSubmit();
});

/* ===============================
       RETURN BOOKS
================================ */

const returnSearchForm = document.getElementById("returnSearchForm");

returnSearchForm?.addEventListener("submit", event => {
    event.preventDefault();

    const studentId =
        document.getElementById("returnStudentId").value.trim();

    const bookId =
        document.getElementById("returnBookId").value.trim();

    const borrowing = borrowings.find(item =>
        item.studentId.toLowerCase() === studentId.toLowerCase() &&
        item.bookId.toLowerCase() === bookId.toLowerCase() &&
        item.status !== "Returned"
    );

    if (!borrowing) {
        selectedReturnBorrowing = null;

        document.getElementById("returnDetails").hidden = true;

        setMessage(
            "returnMessage",
            "No active borrowing found for this Student ID and Book ID."
        );

        return;
    }

    selectedReturnBorrowing = borrowing;

    const member = members.find(item => item.id === borrowing.memberId);

    document.getElementById("returnStudentDisplay").textContent =
        `${borrowing.memberName} (${borrowing.studentId})`;

    document.getElementById("returnBookDisplay").textContent =
        `${borrowing.bookTitle} (${borrowing.bookId})`;

    document.getElementById("returnDueDateDisplay").textContent =
        borrowing.dueDate;

    document.getElementById("returnStatusDisplay").textContent =
        borrowing.status;

    document.getElementById("returnDateDisplay").textContent =
        "Not returned";

    document.getElementById("returnDetails").hidden = false;

    setMessage("returnMessage", "Borrowing record found.", true);
});

document.getElementById("confirmReturnBtn")?.addEventListener("click", () => {
    if (!selectedReturnBorrowing) {
        alert("Search for an active borrowing first.");
        return;
    }

    const borrowing = selectedReturnBorrowing;

    if (borrowing.status === "Returned") {
        alert("This book has already been returned.");
        return;
    }

    borrowing.returnDate = formatDate();
    borrowing.status = "Returned";

    const book = books.find(item => item.id === borrowing.bookId);

    if (book) {
        book.availableCopies = Math.min(book.copies, book.availableCopies + 1);
    }

    // Recalculate any overdue fine after recording the return.
    updateOverdueFines();

    saveData();
    refreshAll();

    document.getElementById("returnStatusDisplay").textContent = "Returned";
    document.getElementById("returnDateDisplay").textContent =
        borrowing.returnDate;

    setMessage("returnMessage", "Book returned successfully.", true);

    document.getElementById("returnDetails").hidden = false;

    selectedReturnBorrowing = null;
});

/* ===============================
       FINES
================================ */

const FINE_PER_DAY = 5; // Demo rate: ₱5 per overdue day.

function updateOverdueFines() {
    const today = formatDate();

    borrowings.forEach(borrowing => {
        if (borrowing.status === "Returned") return;

        if (borrowing.dueDate < today) {
            borrowing.status = "Overdue";

            const endDate = borrowing.returnDate || today;

            const start = new Date(borrowing.dueDate + "T00:00:00");
            const end = new Date(endDate + "T00:00:00");

            const overdueDays = Math.max(
                1,
                Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            );

            let fine = fines.find(item => item.borrowingId === borrowing.id);

            if (!fine) {
                fine = {
                    id: makeId("FN", fines),
                    borrowingId: borrowing.id,
                    memberId: borrowing.memberId,
                    memberName: borrowing.memberName,
                    reason: "Overdue book",
                    amount: overdueDays * FINE_PER_DAY,
                    date: today,
                    status: "Unpaid"
                };

                fines.push(fine);
            } else if (fine.status !== "Paid") {
                fine.amount = overdueDays * FINE_PER_DAY;
            }
        }
    });
}

function renderFines() {
    const table = document.querySelector("#fines table");
    const tbody = ensureTableBody(table);

    if (!tbody) return;

    if (!fines.length) {
        tbody.innerHTML = `<tr><td colspan="6">No fine records.</td></tr>`;
        return;
    }

    tbody.innerHTML = fines.map(fine => `
        <tr>
            <td>${escapeHTML(fine.id)}</td>
            <td>${escapeHTML(fine.memberName)}</td>
            <td>${escapeHTML(fine.reason)}</td>
            <td>${formatMoney(fine.amount)}</td>
            <td>${escapeHTML(fine.date)}</td>
            <td>
                ${statusBadge(fine.status)}
                ${fine.status !== "Paid"
                    ? `<button class="action-btn"
                        data-pay-fine="${escapeHTML(fine.id)}">
                        Pay
                       </button>`
                    : ""}
            </td>
        </tr>
    `).join("");
}

document.querySelector("#fines table")?.addEventListener("click", event => {
    const button = event.target.closest("[data-pay-fine]");
    if (!button) return;

    const fine = fines.find(item => item.id === button.dataset.payFine);

    if (!fine || fine.status === "Paid") return;

    if (confirm(`Record payment of ${formatMoney(fine.amount)}?`)) {
        fine.status = "Paid";
        fine.paidDate = formatDate();

        saveData();
        refreshAll();

        alert("Payment recorded.");
    }
});

document.querySelector("#fines .section-header .primary-btn")
    ?.addEventListener("click", () => {
        const unpaid = fines.filter(item => item.status !== "Paid");

        if (!unpaid.length) {
            alert("There are no unpaid fines.");
            return;
        }

        const fineId = prompt(
            "Enter the Fine ID to record payment:\n" +
            unpaid.map(item => `${item.id}: ${item.memberName} - ${formatMoney(item.amount)}`).join("\n")
        );

        if (fineId === null) return;

        const fine = fines.find(item =>
            item.id.toLowerCase() === fineId.trim().toLowerCase()
        );

        if (!fine || fine.status === "Paid") {
            alert("Unpaid fine not found.");
            return;
        }

        fine.status = "Paid";
        fine.paidDate = formatDate();

        saveData();
        refreshAll();

        alert("Payment recorded successfully.");
    });

/* ===============================
       DIGITAL ASSETS
================================ */


function renderDigitalAssets() {
    const grid = document.querySelector("#digital .asset-grid");

    if (!grid) return;

    if (digitalAssets.length === 0) {
        grid.innerHTML = `
            <p>No digital assets have been added yet.</p>
        `;
        return;
    }

    grid.innerHTML = digitalAssets.map(asset => `
        <div class="asset-card">
            <div class="asset-icon">📄</div>
            <h3>${escapeHTML(asset.title)}</h3>
            <p>${escapeHTML(asset.type || "File")} •
               ${escapeHTML(asset.size || "Unknown size")}</p>
            <span class="badge success">Available</span>

            ${asset.url
                ? `<p><a href="${escapeHTML(asset.url)}"
                    target="_blank"
                    rel="noopener noreferrer">Open file</a></p>`
                : ""}

            <button class="action-btn"
                data-delete-asset="${escapeHTML(asset.id)}">
                Delete
            </button>
        </div>
    `).join("");
}


document.querySelector("#digital .section-header .primary-btn")
    ?.addEventListener("click", () => {
        const title = prompt("Digital asset title:");
        if (title === null || !title.trim()) return;

        const type = prompt("File type (PDF, DOCX, MP4, etc.):", "PDF");
        if (type === null || !type.trim()) return;

        const url = prompt(
            "Optional: enter an existing file URL (leave blank if none)."
        );

        if (url === null) return;

        // This stores asset metadata, not the actual uploaded file.
        digitalAssets.push({
            id: makeId("DA", digitalAssets),
            title: title.trim(),
            type: type.trim().toUpperCase(),
            size: "Not specified",
            url: url.trim()
        });

        saveData();
        renderDigitalAssets();

        alert("Digital asset details saved.");
    });

document.querySelector("#digital .asset-grid")?.addEventListener("click", event => {
    const button = event.target.closest("[data-delete-asset]");
    if (!button) return;

    if (confirm("Delete this digital asset record?")) {
        digitalAssets = digitalAssets.filter(
            item => item.id !== button.dataset.deleteAsset
        );

        saveData();
        renderDigitalAssets();
    }
});

/* ===============================
       DASHBOARD STATISTICS
================================ */

function updateDashboard() {
    const totalBooks = books.reduce(
    (sum, book) => sum + (Number(book.copies) || 0),
    0
);

const availableBooksCount = books.reduce(
    (sum, book) => sum + (
        Number(book.availableCopies ?? book.copies) || 0
    ),
    0
);

const availableBooksElement = document.getElementById("availableBooks");

if (availableBooksElement) {
    availableBooksElement.textContent = availableBooksCount;
}

    const activeMembers = members.filter(
        member => member.status === "Active"
    ).length;

    const borrowedBooks = borrowings.filter(
        item => item.status !== "Returned"
    ).length;

    const outstandingFines = fines
        .filter(item => item.status !== "Paid")
        .reduce((sum, item) => sum + item.amount, 0);

    document.getElementById("totalBooks").textContent = totalBooks;

    const stats = document.querySelectorAll("#dashboard .stat-card");

    if (stats[1]) {
        stats[1].querySelector("h2").textContent = activeMembers;
    }

    if (stats[2]) {
        stats[2].querySelector("h2").textContent = borrowedBooks;
    }

    if (stats[3]) {
        stats[3].querySelector("h2").textContent =
            formatMoney(outstandingFines);
    }

    // Update the Members page statistics.
    const memberStats = document.querySelectorAll("#members .stat-card");

    if (memberStats[0]) {
        memberStats[0].querySelector("h2").textContent = members.length;
    }

    if (memberStats[1]) {
        memberStats[1].querySelector("h2").textContent = activeMembers;
    }

    if (memberStats[2]) {
        const expiringSoon = members.filter(member =>
            member.expiryDate &&
            member.expiryDate >= formatDate() &&
            member.expiryDate <= (() => {
                const date = new Date();
                date.setDate(date.getDate() + 30);
                return formatDate(date);
            })()
        ).length;

        memberStats[2].querySelector("h2").textContent = expiringSoon;
    }

    // Update the Fines page totals.
    const fineStats = document.querySelectorAll("#fines .stat-card");

    if (fineStats[0]) {
        fineStats[0].querySelector("h2").textContent =
            formatMoney(outstandingFines);
    }

    if (fineStats[1]) {
        const collected = fines
            .filter(item => item.status === "Paid")
            .filter(item => (item.paidDate || "").slice(0, 7) === formatDate().slice(0, 7))
            .reduce((sum, item) => sum + item.amount, 0);

        fineStats[1].querySelector("h2").textContent = formatMoney(collected);
    }

    // Inventory progress bars.
    const availableBooks = books.reduce(
        (sum, book) => sum + book.availableCopies, 0
    );

    const borrowedCopies = Math.max(0, totalBooks - availableBooks);

    const progressItems = document.querySelectorAll(
        "#dashboard .progress-item"
    );

    const availablePercent = totalBooks
        ? Math.round(availableBooks / totalBooks * 100)
        : 0;

    const borrowedPercent = totalBooks
        ? Math.round(borrowedCopies / totalBooks * 100)
        : 0;

    if (progressItems[0]) {
        progressItems[0].querySelector("strong").textContent =
            `${availablePercent}%`;

        progressItems[0].querySelector(".progress > div").style.width =
            `${availablePercent}%`;
    }

    if (progressItems[1]) {
        progressItems[1].querySelector("strong").textContent =
            `${borrowedPercent}%`;

        progressItems[1].querySelector(".progress > div").style.width =
            `${borrowedPercent}%`;
    }
}

/* ===============================
       RECENT BORROWINGS
================================ */

function renderRecentBorrowings() {
    const table = document.querySelector("#dashboard .panel table");
    const tbody = ensureTableBody(table);

    if (!tbody) return;

    const recent = [...borrowings]
        .sort((a, b) => b.borrowDate.localeCompare(a.borrowDate))
        .slice(0, 5);

    if (!recent.length) {
        tbody.innerHTML = `
            <tr><td colspan="5">No recent borrowings.</td></tr>`;
        return;
    }

    tbody.innerHTML = recent.map(item => `
        <tr>
            <td>${escapeHTML(item.memberName)}</td>
            <td>${escapeHTML(item.bookTitle)}</td>
            <td>${escapeHTML(item.borrowDate)}</td>
            <td>${escapeHTML(item.dueDate)}</td>
            <td>${statusBadge(item.status)}</td>
        </tr>
    `).join("");
}

/* ===============================
   14. QUICK ACTIONS
================================ */

document.querySelectorAll(".quick-actions button").forEach((button, index) => {
    button.addEventListener("click", () => {
        if (index === 0) {
            openModal("addBookModal");
        } else if (index === 1) {
            showPage("members");
            memberAddButton?.click();
        } else if (index === 2) {
            showPage("borrowings");
            borrowAddButton?.click();
        }
    });
});

// Support the Dashboard's View All button.
document.querySelectorAll("#dashboard .text-btn").forEach(button => {
    button.addEventListener("click", () => showPage("borrowings"));
});

/* ===============================
       REFRESH ALL TABLES
================================ */

function refreshAll() {
    updateOverdueFines();

    saveData();

    renderBooks();
    renderMembers();
    renderBorrowings();
    renderFines();
    renderDigitalAssets();
    renderRecentBorrowings();
    updateDashboard();
}

/* ===============================
      INITIALIZE APPLICATION
================================ */

document.addEventListener("DOMContentLoaded", () => {
    refreshAll();

    // Default page.
    if (currentStudent) {
        showPage("dashboard");
    }
});


/* ================ LOG OUT ================ */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        if (!confirm("Are you sure you want to log out?")) {
            return;
        }

        // Remove the saved active account
        localStorage.removeItem("currentStudent");
        sessionStorage.removeItem("currentStudent");
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("libraryLoggedIn");
        sessionStorage.removeItem("loggedInStudent");

        // Hide the library interface
        document.getElementById("sidebar").style.display = "none";
        document.querySelector(".main").style.display = "none";

        // Show the login page
        const loginPage = document.getElementById("loginPage");
        loginPage.style.display = "flex";

        // Reset login fields
        document.getElementById("loginForm").reset();

        // Reset Gmail verification
        const verificationForm =
            document.getElementById("verificationForm");

        if (verificationForm) {
            verificationForm.reset();
            verificationForm.hidden = true;
        }

        const otpStatus = document.getElementById("otpStatus");
        if (otpStatus) otpStatus.textContent = "";

        // Reset the displayed student information
        document.getElementById("loggedInUser").textContent = "Student";
        document.getElementById("loggedInEmail").textContent = "";

        // Return to the login screen
        window.scrollTo(0, 0);
    });
}

/* ================= LOG OUT FUNCTION ================= */

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    const loginPage = document.getElementById("loginPage");
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".main");
    const loginForm = document.getElementById("loginForm");
    const verificationForm = document.getElementById("verificationForm");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // Ask for confirmation before logging out
            const confirmLogout = confirm("Are you sure you want to log out?");

            if (!confirmLogout) {
                return;
            }

            // Hide the library system
            if (sidebar) {
                sidebar.style.display = "none";
            }

            if (main) {
                main.style.display = "none";
            }

            // Show the login page
            if (loginPage) {
                loginPage.style.display = "flex";
            }

            // Reset the login and verification forms
            if (loginForm) {
                loginForm.reset();
            }

            if (verificationForm) {
                verificationForm.reset();
                verificationForm.hidden = true;
            }

            // Clear the verification status
            const otpStatus = document.getElementById("otpStatus");
            if (otpStatus) {
                otpStatus.textContent = "";
            }

            // Clear the verification code
            const verificationCode =
                document.getElementById("verificationCode");

            if (verificationCode) {
                verificationCode.value = "";
            }

            // Return the page to the top
            window.scrollTo(0, 0);
        });
    }
});

/* ==========================================
   LOGOUT — RETURN TO LOGIN PAGE
========================================== */

document.getElementById("logoutBtn")?.addEventListener("click", function () {

    //  Remove the active login session
    sessionStorage.removeItem("currentStudent");
    localStorage.removeItem("currentStudent");

    //  Hide the library dashboard and sidebar
    document.getElementById("sidebar").style.display = "none";
    document.querySelector(".main").style.display = "none";

    //  Hide Gmail verification
    document.getElementById("verificationForm").hidden = true;

    //  Reset the login form
    document.getElementById("loginForm").reset();
    document.getElementById("loginForm").hidden = false;

    //  Display the login page
    document.getElementById("loginPage").style.display = "flex";

    //  Clear any verification messages
    const otpStatus = document.getElementById("otpStatus");
    if (otpStatus) {
        otpStatus.textContent = "";
    }

    //  Clear the verification code
    const verificationCode = document.getElementById("verificationCode");
    if (verificationCode) {
        verificationCode.value = "";
    }

});
