#include <iostream>
#include <string>
#include <vector>

using namespace std;

int bjp = 0, congress = 0, aap = 0, bsp = 0;

struct Candidate {
    string name;
    string partyAffiliation;
};

struct Voter {
    string username;
    string password;
    bool hasVoted;
};

vector<Candidate> candidates;
vector<Voter> voters;

int totalVoters = 0;
int totalCandidates = 0;

const string adminPassword = "admin123";

void registerCandidate(Candidate &candidate) {
    cout << "Enter Candidate Name: ";
    cin >> candidate.name;

    cout << "Enter Party Affiliation: ";
    cin >> candidate.partyAffiliation;

    totalCandidates++;
}

void addCandidates() {
    candidates.push_back({"Candidate 1", "BJP"});
    candidates.push_back({"Candidate 2", "Congress"});
    candidates.push_back({"Candidate 3", "AAP"});
    candidates.push_back({"Candidate 4", "BSP"});
    totalCandidates = 4;
}

void registerOrUpdateCandidate(Candidate &candidate) {
    if (totalCandidates < 100) {
        int candidateIndex = -1;
        for (int i = 0; i < totalCandidates; i++) {
            {
                candidateIndex = i;
                break;
            }
        }

        if (candidateIndex != -1) {
            cout << "Candidate found. Updating the profile..." << endl;
            registerCandidate(candidates[candidateIndex]);
            cout << "Candidate profile updated successfully." << endl;
        } else {
            registerCandidate(candidate);
            cout << "New candidate registered successfully." << endl;
        }
    }
}

void registerVoter(const string& username, const string& password) {
    if (totalVoters < 100) {
        voters.push_back({username, password, false});
        totalVoters++;
    }
}

bool authenticateAdmin(const string& password) {
    return password == adminPassword;
}

int authenticate(const string& username, const string& password) {
    if (username == "admin" && password == adminPassword) {
        return 3;
    }

    for (int i = 0; i < totalVoters; i++) {
        if (voters[i].username == username && voters[i].password == password) {
            if (!voters[i].hasVoted) {
                voters[i].hasVoted = true;
                return 1;
            } else {
                return 2;
            }
        }
    }
    return 0;
}

void electionResult(const string& password) {
    if (authenticateAdmin(password)) {
        cout << "\n*||Election Results||:" << endl;
        cout << "BJP: " << bjp << " votes" << endl;
        cout << "Congress: " << congress << " votes" << endl;
        cout << "AAP: " << aap << " votes" << endl;
        cout << "BSP: " << bsp << " votes" << endl;
    } else {
        cout << "Incorrect admin password. Access denied." << endl;
    }
}

void vote(int choice, bool& loggedIn) {
    if (choice >= 1 && choice <= 4) {
        switch (choice) {
            case 1:
                bjp++;
                break;
            case 2:
                congress++;
                break;
            case 3:
                aap++;
                break;
            case 4:
                bsp++;
                break;
        }
        cout << "Thank you for voting!" << endl;
        loggedIn = false;
    } else {
        cout << "Invalid choice. Please try again." << endl;
    }
}

int main() {
    addCandidates();
    bool loggedIn = false;
    string currentUser;
    cout << "Created by TECH VOTE TEAM" << endl;
    cout << "Team number 16" << endl;
    cout << "MAYUR Enrollment no-23IT074" << endl;
    cout << "YASH Enrollment no-23IT182" << endl;
    cout << "HARSHIL Enrollment no-23IT150" << endl;
    cout << "||Welcome to the Voting System||" << endl;

    while (true) {
        if (!loggedIn) {
            int choice;
            cout << "1. Login\n2. Register as a new voter\n3. Register as a new candidate\n4. Exit" << endl;
            cout << "Enter your choice: ";
            cin >> choice;

            if (choice == 1) {
                string username, password;
                cout << "Enter your username: ";
                cin >> username;
                cout << "Enter your password: ";
                cin >> password;

                int authResult = authenticate(username, password);
                if (authResult == 3) {
                    cout << "Admin login successful. You have access to admin functionalities." << endl;
                } else if (authResult == 1) {
                    cout << "Authentication successful. You can now vote." << endl;
                    currentUser = username;
                    loggedIn = true;
                } else if (authResult == 2) {
                    cout << "You have already voted." << endl;
                } else {
                    cout << "Authentication failed. Please try again." << endl;
                }
            } else if (choice == 2) {
                string username, password;
                cout << "Enter a new username: ";
                cin >> username;
                cout << "Enter a new password: ";
                cin >> password;
                registerVoter(username, password);
                cout << "Registration successful. You can now log in and vote." << endl;
            } else if (choice == 3) {
                registerOrUpdateCandidate(candidates[totalCandidates]);
            } else if (choice == 4) {
                break;
            } else {
                cout << "Invalid choice. Please try again." << endl;
            }
        } else {
            int voteChoice;
            cout << "1. Vote\n2. Show election result\n3. Log out" << endl;
            cout << "Please choose: ";
            cin >> voteChoice;

            if (voteChoice == 1) {
                cout << "Candidates:" << endl;
                for (int i = 0; i < 4; i++) {
                    cout << i + 1 << ". " << candidates[i].name << endl;
                }

                int candidateChoice;
                cout << "Select a candidate by entering their number (1 to 4): ";
                cin >> candidateChoice;
                vote(candidateChoice, loggedIn);
            } else if (voteChoice == 2) {
                string adminPasswordInput;
                cout << "Enter admin password to view results: ";
                cin >> adminPasswordInput;
                electionResult(adminPasswordInput);
            } else if (voteChoice == 3) {
                cout << "Logging out..." << endl;
                loggedIn = false;
            }
        }
    }
    return 0;
}
